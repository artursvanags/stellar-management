import prismadb from '@/lib/utils/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';
import { cache } from 'react';
import { Filaments } from '@/types/database';

export const getUserId = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Session or user not found');
  } else if (!session.user) {
    throw new Error('User not found');
  }

  return session.user.id;
};

export const data = async () => {
  const userId = await getUserId();

  try {
    const user = await prismadb.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const filaments = await prismadb.filament.findMany({
      where: { userId: user.id },
      include: {
        tags: true,
      },
    });

    const userSettings = await prismadb.userSettings.findFirst({
      where: { userId: user.id },
    });

    const billing = await prismadb.billing.findFirst({
      where: { userId: user.id },
    });

    return { user, filaments, billing, userSettings };
  } catch (err) {
    console.error(err);
    return { user: null, filaments: [], billing: null, userSettings: null };
  }
};

export const getData = cache(data);

