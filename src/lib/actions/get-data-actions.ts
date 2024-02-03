'use server';

import prismadb from '@/lib/utils/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

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
