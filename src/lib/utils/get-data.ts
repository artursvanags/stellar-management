import prismadb from '@/lib/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';
import { cache } from 'react';

export const getUserId = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Session or user not found');
  } else if (!session.user) {
    throw new Error('User not found');
  }

  return session.user.id;
};

export const data = async () => {
  const userId = await getUserId();

  try {
    const user = await prismadb.user.findUnique({
      where: { id: userId }, // Removed optional chaining
    });

    if (!user) {
      throw new Error('User not found');
    }

    const filaments = await prismadb.filament.findMany({
      where: { userId: user.id }, // Removed optional chaining
      include: {
        manufacturer: true,
        material: true,
        color: true,
        tags: true,
      },
    });

    const userSettings = await prismadb.userSettings.findFirst({
      where: { userId: user.id }, // Removed optional chaining
    });

    const billing = await prismadb.billing.findFirst({
      where: { userId: user.id }, // Removed optional chaining
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

    return { user, filaments: filamentData, billing, userSettings };
  } catch (err) {
    console.error(err);
    return { user: null, filaments: [], billing: null, userSettings: null };
  }
};

export const getData = cache(data);

