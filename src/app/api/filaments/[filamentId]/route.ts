import { NextResponse } from 'next/server';

import { getUser } from '@/lib/actions/user-data-actions';
import { getFilament } from '@/lib/actions/filament-data-actions';
import {
  deleteFilament,
  updateFilament,
} from '@/lib/actions/filament-data-actions';

export async function PATCH(
  request: Request,
  { params }: { params: { filamentId: string } },
) {
  try {
    const user = await getUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 404 });
    }
    const body = await request.json();

    const filament = await getFilament(params.filamentId);
    if (!filament) {
      return new NextResponse('Filament not found', { status: 404 });
    }

    await updateFilament(params.filamentId, body);

    return new NextResponse('Filament has been updated successfully!', {
      status: 200,
    });
  } catch (error) {
    console.log('[PATCH-ERROR]', error);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { filamentId: string } },
) {
  try {
    const user = await getUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 404 });
    }

    const filament = await getFilament(params.filamentId);
    if (!filament) {
      return new NextResponse('Filament not found', { status: 404 });
    }

    await deleteFilament(params.filamentId);

    return new NextResponse('Delete successful!', { status: 200 });
  } catch (error) {
    console.log('[DELETE-ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
