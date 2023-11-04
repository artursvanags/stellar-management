import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';
import prismadb from '@/lib/database';

export async function getFilaments() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log('Session not found');
    }

    const user = await prismadb.user.findUnique({
      where: { email: session?.user?.email! },
    });
    if (!user) {
      console.log('Unauthorized');
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
      diameter: filament.diameter,
      manufacturer: filament.manufacturer.name,
      material: filament.material.name,
      color: filament.color.name,
      weight: filament.weight,
      remainingWeight: filament.remainingWeight,
      createdAt: filament.createdAt,
      updatedAt: filament.updatedAt,
      tags: filament.tags.map((tag) => tag.name), // Assuming tags have a 'name' property
    }));

    return formatData;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteFilaments(data: string[]) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log('Session not found');
    }

    const user = await prismadb.user.findUnique({
      where: { email: session?.user?.email! },
    });
    if (!user) {
      console.log('Unauthorized');
    }


    // Check if the body is an array
    if (Array.isArray(data)) {
      // Get the filaments to be deleted
      const filaments = await prismadb.filament.findMany({
        where: {
          id: {
            in: data,
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
            in: data,
          },
        },
      });

      // Check if the associated manufacturer, color, material, and tags are used by any other filament
      for (const filament of filaments) {
        const otherFilaments = await prismadb.filament.findMany({
          where: {
            OR: [
              { manufacturerId: filament.manufacturerId },
              { colorId: filament.colorId },
              { materialId: filament.materialId },
            ],
          },
        });

        // If there are no other filaments, delete the manufacturer, color, material, and tags
        if (otherFilaments.length === 0) {
          await prismadb.manufacturer.delete({
            where: { id: filament.manufacturerId },
          });
          await prismadb.color.delete({ where: { id: filament.colorId } });
          await prismadb.material.delete({
            where: { id: filament.materialId },
          });
          for (const tag of filament.tags) {
            await prismadb.tag.delete({ where: { id: tag.id } });
          }
        }
      }
    } else {
      await prismadb.filament.delete({
        where: { id: data },
      });
    }

    return data;
  } catch (error) {
    return console.error(error);
  }
}
