'use server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';
import prismadb from '@/lib/utils/database';

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
