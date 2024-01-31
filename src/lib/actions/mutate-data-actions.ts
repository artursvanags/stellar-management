'use server';
import prismadb from '@/lib/utils/database';
import { Filament, Tags } from '@prisma/client';

export type FilamentWithTags = Filament & { tags?: Tags[] };

export const createMultipleFilaments = async (
  userId: string,
  data: FilamentWithTags[],
) => {
  const operations = data.map((item: any) => {
    const filamentData = {
      ...item,
      userId: userId,
    };

    if (item.tags && item.tags.length > 0) {
      filamentData.tags = {
        connectOrCreate: item.tags.map((tag: Tags) => ({
          where: { name: tag.name },
          create: { name: tag.name },
        })),
      };
    }
    return prismadb.filament.create({
      data: filamentData,
    });
  });

  await prismadb.$transaction(operations);
};

export const updateFilament = async (id: string, data: Partial<Filament>) => {
  await prismadb.filament.update({
    where: { id: id },
    data: data,
  });
};

export const updateMultipleFilaments = async ({
  ids,
  data,
}: {
  ids: string[];
  data: Partial<Filament>;
}) => {
  const operations = ids.map((id) => {
    return prismadb.filament.update({
      where: { id: id },
      data: data,
    });
  });
  await prismadb.$transaction(operations);
};

export const deleteFilament = async (id: string) => {
  const deleteFilament = await prismadb.filament.delete({
    where: { id: id },
    include: { tags: true }, // Include the tags relation
  });

  const tagIds = deleteFilament.tags.map((tag) => tag.id);

  await prismadb.tags.deleteMany({
    where: {
      id: { in: tagIds },
      filaments: { none: {} }, // Delete tags that no longer have any relationship
    },
  });
};

export const deleteMultipleFilaments = async (ids: string[]) => {
  const operations = ids.map((id) => {
    return prismadb.filament.delete({
      where: { id },
      include: { tags: true }, // Include the tags relation
    });
  });

  const deleteResults = await prismadb.$transaction(operations);

  const tagOperations = deleteResults.flatMap((deleteFilament) => {
    return deleteFilament.tags.map((tag) => {
      return prismadb.tags.deleteMany({
        where: {
          id: tag.id,
          filaments: { none: {} }, // Delete tags that no longer have any relationship
        },
      });
    });
  });

  if (tagOperations.length > 0) {
    // Only run if there are tags to delete
    await prismadb.$transaction(tagOperations);
  }
};