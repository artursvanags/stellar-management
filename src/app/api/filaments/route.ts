import { NextResponse } from 'next/server';
import { checkUserSession } from '@/lib/utils/checkUserSession';

import prismadb from '@/lib/utils/database';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { user, error } = await checkUserSession();  
    if (error) {
      return new NextResponse(error.message, { status: error.status });
    }

    const data = await prismadb.filament.findMany({
      where: { userId: user?.id },
      include: {
        tags: true,
      },
    });

    // Restructure the data
    const formatData = data.map((item) => ({
...item,
      tags: item.tags.map((tag) => tag.name),
    }));

    return new NextResponse(JSON.stringify(formatData, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { user, error } = await checkUserSession();  
    if (error) {
      return new NextResponse(error.message, { status: error.status });
    }

    const body = await request.json();

    const operations = body.map((item: any) => {
      const filamentData = {
        ...item,
        userId: user?.id,
      };
    
      if (item.tags && item.tags.length > 0) {
        filamentData.tags = {
          connectOrCreate: item.tags.map((tag: any) => ({
            where: { name: tag.name, userId: user?.id },
            create: { name: tag.name, userId: user?.id },
          })),
        };
      }
    
      return prismadb.filament.create({
        data: filamentData,
      });
    });
    
    await prismadb.$transaction(operations);
    return new NextResponse('Post successful!', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { user, error } = await checkUserSession();  
    if (error) {
      return new NextResponse(error.message, { status: error.status });
    }

    const body = await request.json();
    const updates = body.map(
      ({ id, ...data }: { id: string; [key: string]: any }) => ({ id, data }),
    );

    for (const update of updates) {
      await prismadb.filament.update({
        where: { 
          userId: user?.id,
          id: update.id },
        data: update.data,
      });
    }

    return new NextResponse('Update successful!', { status: 200 });
  } catch (error) {
    return new NextResponse(`Internal error - ${error}`, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { user, error } = await checkUserSession();  
    if (error) {
      return new NextResponse(error.message, { status: error.status });
    }

    const body = await request.json();

    // Get the filaments to be deleted
    const filaments = await prismadb.filament.findMany({
      where: {
        userId: user?.id,
        id: {
          in: body,
        },
      },
      include: {
        tags: true,
      },
    });

    // Delete the filaments
    await prismadb.filament.deleteMany({
      where: {
        id: {
          in: body,
        },
      },
    });

    // Delete tags that are no longer present in any other filaments
    const tagsToDelete = filaments.flatMap((filament) => filament.tags).map(tag => tag.id.toString());
    await prismadb.tags.deleteMany({
      where: {
        id: {
          in: tagsToDelete,
        },
        filaments: {
          none: {
            id: {
              in: body,
            },
          },
        },
      },
    });

    return new NextResponse('Delete successful!', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Internal error ${error}`, { status: 500 });
  }
}
