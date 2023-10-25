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
    const formatData = data.map((filament) => ({
      id: filament.id,
      userId: filament.userId,
      status: filament.status,
      manufacturer: filament.manufacturer.name,
      material: filament.material.name,
      color: filament.color.name,
      weight: filament.weight,
      remainingWeight: filament.remainingWeight,
      createdAt: filament.createdAt,
      updatedAt: filament.updatedAt,
      tags: filament.tags.map((tag) => tag.name), // Assuming tags have a 'name' property
    }));

    return NextResponse.json(formatData, { status: 200 });
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

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse('Internal Error', { status: 500 });
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

    const { id } = body;

    const data = await prismadb.filament.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
