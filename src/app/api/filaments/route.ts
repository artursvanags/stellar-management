import { NextResponse } from 'next/server';
import { getUser } from '@/lib/actions/user-data-actions';
import {
  createMultipleFilaments,
  deleteMultipleFilaments,
  updateMultipleFilaments,
} from '@/lib/actions/filament-data-actions';

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 404 });
    }
    const body = await request.json();
    await createMultipleFilaments(user.id, body);

    return new NextResponse('Post successful!', { status: 200 });
  } catch (error) {
    console.log('[POST-ERROR]', error);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 404 });
    }

    const body = await request.json();

    await updateMultipleFilaments(body);

    return new NextResponse('Update successful!', { status: 200 });
  } catch (error) {
    console.log('[PATCH-ERROR]', error);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 404 });
    }

    const body = await request.json();
    await deleteMultipleFilaments(body);

    return new NextResponse('Delete successful!', { status: 200 });
  } catch (error) {
    console.log('[DELETE-ERROR]', error);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}
