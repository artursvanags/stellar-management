'use server';

import prismadb from '@/lib/utils/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

export async function getUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) return null;
  const user = await prismadb.user.findUnique({
    where: { email: session.user.email },
    include: {
      settings: true,
    },
  });
  if (!user) return null;
  return user;
}

export const getFilament = async (id: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error('User not found');

    const filaments = await prismadb.filament.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
      include: {
        tags: true,
      },
    });

    return filaments;
  } catch (err) {
    throw new Error('Unexpected error occoured:' + err);
  }
};

export const getMultipleFilaments = async () => {
  try {
    const user = await getUser();
    if (!user) throw new Error('User not found');

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

export const getUserTags = async () => {
  try {
    const user = await getUser();
    if (!user) throw new Error('User not found');

    const tags = await prismadb.tags.findMany({
      where: {
        filaments: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    return tags;
  } catch (err) {
    throw new Error('Unexpected error occoured:' + err);
  }
};
