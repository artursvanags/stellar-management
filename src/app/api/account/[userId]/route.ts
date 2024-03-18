import { NextResponse } from 'next/server';

import prismadb from '@/lib/utils/database';
import { getUser } from '@/lib/actions/user-data-actions';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const user = await getUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 404 });
    }

    const body = await request.json();
    await prismadb.user.update({
      where: { id: params.userId },
      data: body,
    });

    return new NextResponse('Post successful!', { status: 200 });
  } catch (error) {
    console.log('[POST-ERROR]', error);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const user = await getUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 404 });
    }

    await prismadb.user.delete({
      where: { id: params.userId },
    });

    return new NextResponse('Delete successful!', { status: 200 });
  } catch (error) {
    console.log('[DELETE-ERROR]', error);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}
