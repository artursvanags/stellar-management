'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

import prismadb from '@/lib/utils/database';

export async function checkUserSession() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return {
        user: null,
        error: "Session not found",
      };
    }

    const user = await prismadb.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return {
        user: null,
        error: { message: 'User not found', status: 404 },
      };
    }
    return { user };
  } catch (error) {
    console.error('checkUserSession:', error);
    return {
      user: null,
      error: { message: 'An unexpected error occurred', status: 500 },
    };
  }
}
