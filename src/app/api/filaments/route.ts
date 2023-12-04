import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

import prismadb from '@/lib/database';

export const dynamic = 'force-dynamic';

export async function GET() {
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

    const data = await prismadb.filament.findMany({
      where: { userId: user?.id },
      include: {
        manufacturer: true,
        material: true,
        color: true,
        tags: true,
      },
    });

    // Restructure the data
    const formatData = data.map((item) => ({
      id: item.id,
      userId: item.userId,
      status: item.status,
      diameter: item.diameter,
      manufacturer: item.manufacturer.name,
      material: item.material.name,
      color: item.color.name,
      weight: item.weight,
      remainingWeight: item.remainingWeight,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      tags: item.tags.map((tag) => tag.name), // Assuming tags have a 'name' property
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

    // Prepare an array to store all the form data
    const formData = [];

    // Iterate over each form in the body
    for (const formKey in body) {
      if (body.hasOwnProperty(formKey)) {
        const form = body[formKey];
        for (const key in form) {
          if (form.hasOwnProperty(key)) {
            let {
              manufacturer,
              material,
              color,
              diameter,
              net_weight,
              used_weight,
              state,
            } = form[key];

            // Check if manufacturer, material, and color exist, if not create them
            const [existingManufacturer] = await prismadb.manufacturer.findMany(
              {
                where: { name: manufacturer },
              },
            );
            if (!existingManufacturer) {
              const newManufacturer = await prismadb.manufacturer.create({
                data: { name: manufacturer },
              });
              manufacturer = newManufacturer.id;
            } else {
              manufacturer = existingManufacturer.id;
            }

            const [existingMaterial] = await prismadb.material.findMany({
              where: { name: material },
            });
            if (!existingMaterial) {
              const newMaterial = await prismadb.material.create({
                data: { name: material },
              });
              material = newMaterial.id;
            } else {
              material = existingMaterial.id;
            }

            const [existingColor] = await prismadb.color.findMany({
              where: { name: color },
            });
            if (!existingColor) {
              const newColor = await prismadb.color.create({
                data: { name: color },
              });
              color = newColor.id;
            } else {
              color = existingColor.id;
            }

            // Push the form data into the formData array
            formData.push({
              userId: user.id,
              status: state,
              diameter: parseFloat(diameter),
              manufacturerId: manufacturer,
              materialId: material,
              colorId: color,
              weight: parseFloat(net_weight),
              remainingWeight: parseFloat(used_weight),
            });
          }
        }
      }
    }

    // Create many filaments using the formData array
    const data = await prismadb.filament.createMany({
      data: formData,
    });

    return new NextResponse('Post successful!', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(request: Request) {
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
    const updates = body.map(
      ({ id, ...data }: { id: string; [key: string]: any }) => ({ id, data }),
    );

    for (const update of updates) {
      await prismadb.filament.update({
        where: { id: update.id },
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

    // Get the filaments to be deleted
    const filaments = await prismadb.filament.findMany({
      where: {
        id: {
          in: body,
        },
      },
      include: {
        manufacturer: true,
        color: true,
        material: true,
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

    // Create sets to store unique manufacturers, colors, materials, and tags
    const manufacturersToDelete = new Set();
    const colorsToDelete = new Set();
    const materialsToDelete = new Set();
    const tagsToDelete = new Set();

    for (const item of filaments) {
      const otherFilaments = await prismadb.filament.findMany({
        where: {
          OR: [
            { manufacturerId: item.manufacturerId },
            { colorId: item.colorId },
            { materialId: item.materialId },
          ],
        },
      });

      // If there are no other items, add the manufacturer, color, material, and tags to the sets
      if (otherFilaments.length === 0) {
        manufacturersToDelete.add(item.manufacturerId);
        colorsToDelete.add(item.colorId);
        materialsToDelete.add(item.materialId);
        for (const tag of item.tags) {
          tagsToDelete.add(tag.id);
        }
      }
    }
    // Delete the unique manufacturers, colors, materials, and tags
    for (const id of manufacturersToDelete) {
      await prismadb.manufacturer.delete({ where: { id: id as string } });
    }
    for (const id of colorsToDelete) {
      await prismadb.color.delete({ where: { id: id as string } });
    }
    for (const id of materialsToDelete) {
      await prismadb.material.delete({ where: { id: id as string } });
    }
    for (const id of tagsToDelete) {
      await prismadb.tag.delete({ where: { id: id as string } });
    }

    return new NextResponse('Delete successful!', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Internal error ${error}`, { status: 500 });
  }
}
