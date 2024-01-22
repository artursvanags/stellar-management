import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

import prismadb from '@/lib/utils/database';

export const dynamic = 'force-dynamic';

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
    });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await prismadb.user.update({
      where: { id: params.userId },
      data: body,
    });

    return new NextResponse('Update successful!', { status: 200 });
  } catch (error) {
    return new NextResponse(`Internal error - ${error}`, { status: 500 });
  }
}

export async function DELETE(
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
    });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prismadb.user.delete({
      where: { id: params.userId },
    });

    return new NextResponse('Delete successful!', { status: 200 });
  } catch (error) {
    return new NextResponse(`Internal error - ${error}`, { status: 500 });
  }
}
