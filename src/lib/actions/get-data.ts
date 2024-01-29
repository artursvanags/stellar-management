'use server';

import prismadb from '@/lib/utils/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

export async function getUser() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      throw new Error('Session not found');
    }

    const user = await prismadb.user.findUnique({
      where: { email: session.user.email },
      include: {
        settings: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    throw new Error('Unexpected error occurred: ' + err);
  }
}

export const getFilaments = async () => {
  try {
    const user = await getUser();

    const filaments = await prismadb.filament.findMany({
      where: { userId: user.id },
      include: {
        tags: true,
      },
    });

    return filaments;
  } catch (err) {
    throw new Error('Unexpected error occoured:' + err);
  }
};

export const getTags = async () => {
  try {
    const user = await getUser();

    const tags = await prismadb.tags.findMany({
      where: { userId: user.id },
    });

    return tags;
  } catch (err) {
    throw new Error('Unexpected error occoured:' + err);
  }
};

export const getData = async () => {
  try {
    const user = await getUser();

    const userSettings = await prismadb.userSettings.findFirst({
      where: { userId: user.id },
    });

    const filaments = await prismadb.filament.findMany({
      where: { userId: user.id },
      include: {
        tags: true,
      },
    });

    const tags = await prismadb.tags.findMany({
      where: { userId: user.id },
    });

    return { user, settings: userSettings, filaments, tags };
  } catch (err) {
    console.error(err);
    return { user: null, filaments: [], tags: null };
  }
};
