import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

import prismadb from '@/lib/utils/database';

export async function POST(
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
      include: { billing: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Add billing data with user relationship
    await prismadb.billing.create({
      data: {
        user: { connect: { id: params.userId } },
        ...body,
      },
    });

    return new NextResponse('Post successful!', { status: 200 });
  } catch (error) {
    console.error('Error creating billing data:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An error occurred while creating billing data',
        path: request.url,
        details: error,
      },
      { status: 500 },
    );
  }
}

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
      include: { billing: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user.billing) {
      return NextResponse.json(
        { error: 'No billing information found' },
        { status: 404 },
      );
    }

    const body = await request.json();

    await prismadb.billing.update({
      where: { id: user.billing.id },
      data: body,
    });

    return new NextResponse('Update successful!', { status: 200 });
  } catch (error) {
    console.error('Error updating billing data:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An error occurred while updating billing data',
        path: request.url,
        details: error,
      },
      { status: 500 },
    );
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
      include: { billing: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user.billing) {
      return NextResponse.json(
        { error: 'No billing information found' },
        { status: 404 },
      );
    }

    await prismadb.billing.delete({
      where: { id: user.billing.id },
    });

    return new NextResponse('Delete successful!', { status: 200 });
  } catch (error) {
    console.error('Error deleting billing data:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An error occurred while deleting billing data',
        path: request.url,
        details: error,
      },
      { status: 500 },
    );
  }
}
