'use server';

import { UserData } from '@/types/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';
import prismadb from '@/lib/utils/database';

/**
 * Get the user data from the database
 * @returns The user data
 */
export async function getUser(): Promise<UserData | null> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) return null;

  const user = await prismadb.user.findUnique({
    where: { email: session.user.email },
    include: {
      settings: true,
    },
  });
  if (!user) return null;
  return user as UserData;
}
