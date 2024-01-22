import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

import prismadb from '@/lib/utils/database';

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 401 });
    }

    const user = await prismadb.user.findUnique({
      where: { email: session?.user?.email! },
      include: { settings: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Update user settings
    await prismadb.userSettings.update({
      where: { userId: params.userId },
      data: body, 
    });

    return new NextResponse('Update successful!', { status: 200 });
  } catch (error) {
    console.error('Error updating user settings:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An error occurred while updating user settings',
        path: request.url,
        details: error,
      },
      { status: 500 },
    );
  }
}
