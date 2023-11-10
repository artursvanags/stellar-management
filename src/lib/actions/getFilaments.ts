import prismadb from '@/lib/database';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';

export async function validateSessionAndUser()  {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log('Session not found');
    return null;
  }

  const user = await prismadb.user.findUnique({
    where: { email: session?.user?.email! },
  });
  if (!user) {
    console.log('Unauthorized');
    return null;
  }

  return user;
}

export async function getFilaments() {
  try {
    const user = await validateSessionAndUser();
    if (!user) {
      return;
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
      isFavorite: item.isFavorite,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      tags: item.tags.map((tag) => tag.name), // Assuming tags have a 'name' property
    }));

    return formatData;
  } catch (err) {
    console.error(err);
  }
}
