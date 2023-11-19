import prismadb from '@/lib/database';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';

import { User, Billing } from '@prisma/client';
import { Filaments } from '@/types/database';

interface Data {
  user: User | null;
  filaments: Filaments[];
  billing: Billing | null;
}

export async function validateSessionAndUser() {
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

  return user;
}

export async function getData(): Promise<Data> {
  try {
    const user = await validateSessionAndUser();
    
    const filaments = await prismadb.filament.findMany({
      where: { userId: user?.id },
      include: {
        manufacturer: true,
        material: true,
        color: true,
        tags: true,
      },
    });

    const billing = await prismadb.billing.findFirst({
      where: { userId: user?.id },
    });

    // Restructure the data
    const filamentData = filaments.map((item) => ({
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

    return { user, filaments: filamentData, billing };
  } catch (err) {
    console.error(err);
    return { user: null, filaments: [], billing: null };

  }
}
