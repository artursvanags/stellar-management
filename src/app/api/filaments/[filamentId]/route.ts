import { checkUserSession } from '@/lib/utils/checkUserSession';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

import prismadb from '@/lib/utils/database';
import { getUpdateObject } from '@/lib/utils';


export async function GET(
  request: Request,
  { params }: { params: { filamentId: string } },
) {
  try {
    const { user, error } = await checkUserSession();  
    if (error) {
      return new NextResponse(error.message, { status: error.status });
    }
    
    const data = await prismadb.filament.findUnique({
      where: { 
        userId: user?.id,
        id: params.filamentId },
      include: {
        manufacturer: true,
        material: true,
        color: true,
        tags: true,
      },
    });

    if (!data) {
      return new NextResponse('Data not found', { status: 404 });
    }
    
    const formatData = {
      id: data.id,
      userId: data.userId,
      status: data.status,
      diameter: data.diameter,
      manufacturer: data.manufacturer.name,
      material: data.material.name,
      color: data.color.name,
      weight: data.weight,
      remainingWeight: data.remainingWeight,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      tags: data.tags, 
    };
    
    if (!data) {
      return new NextResponse('Data not found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(formatData, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { filamentId: string } },
) {
  try {
    const { user, error } = await checkUserSession();  
    if (error) {
      return new NextResponse(error.message, { status: error.status });
    }

    const body = await request.json();
    console.log(body)
    await prismadb.filament.update({
      where: {
        id: params.filamentId,
      },
      data: {
        ...body,
        manufacturer: getUpdateObject(body.manufacturer),
        material: getUpdateObject(body.material),
        color: getUpdateObject(body.color),
        tags: {
          connectOrCreate: body.tags.map((tag: any) => ({
            where: { id: tag.id },
            create: { id: tag.id, name: tag.name },
          })),
        },
      },
    });

    return new NextResponse('Update successful!', { status: 200 });
  } catch (error) {
    return new NextResponse(`Internal error - ${error}`, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { filamentId: string } },
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

    const filament = await prismadb.filament.findUnique({
      where: {
        id: params.filamentId,
      },
      include: {
        manufacturer: true,
        color: true,
        material: true,
        tags: true,
      },
    });

    if (!filament) {
      throw new Error('Filament not found');
    }

    await prismadb.filament.delete({
      where: {
        id: params.filamentId,
      },
    });

    const { manufacturer, color, material, tags } = filament;

    if (
      manufacturer &&
      (await prismadb.filament.count({
        where: { manufacturerId: manufacturer.id },
      })) === 0
    ) {
      await prismadb.manufacturer.delete({ where: { id: manufacturer.id } });
    }

    if (
      color &&
      (await prismadb.filament.count({ where: { colorId: color.id } })) === 0
    ) {
      await prismadb.color.delete({ where: { id: color.id } });
    }

    if (
      material &&
      (await prismadb.filament.count({
        where: { materialId: material.id },
      })) === 0
    ) {
      await prismadb.material.delete({ where: { id: material.id } });
    }

    for (const tag of tags) {
      if (
        (await prismadb.filament.count({
          where: { tags: { some: { id: tag.id } } },
        })) === 0
      ) {
        await prismadb.tag.delete({ where: { id: tag.id } });
      }
    }

    return new NextResponse('Delete successful!', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
