'use server';
import prismadb from '@/lib/utils/database';
import { Filament, Tags } from '@prisma/client';
import { getUser } from '@/lib/actions/user-data-actions';

export type FilamentWithTags = Filament & { tags?: Tags[] };

export const getFilament = async (id: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error('User not found');

    const filaments = await prismadb.filament.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
      include: {
        tags: true,
      },
    });

    return filaments;
  } catch (err) {
    throw new Error('Unexpected error occoured:' + err);
  }
};

export const getMultipleFilaments = async () => {
  try {
    const user = await getUser();
    if (!user) throw new Error('User not found');

    const filaments = await prismadb.filament.findMany({
      where: { userId: user.id },
      include: {
        tags: true,
      },
    });

    return filaments;
  } catch (err) {
    throw new Error('Unexpected error occoured:' + err);
  }
};

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

export const updateFilament = async (
  id: string,
  data: Partial<FilamentWithTags>,
) => {
  const getCurrentFilamentData = await prismadb.filament.findFirst({
    where: { id: id },
    include: { tags: true },
  });

  const tagsToDelete = getCurrentFilamentData?.tags.filter(
    (tag) => !data.tags?.some((newTag) => newTag.name === tag.name),
  );

  const { tags, ...rest } = data;
  const filamentData = {
    ...rest,
    tags: {
      connectOrCreate: tags?.map((tag) => ({
        where: { name: tag.name },
        create: { name: tag.name }
      })),
    },
  };

  // Delete tags that are no longer associated with the filament
  if (tagsToDelete) {
    for (const tag of tagsToDelete) {
      const tagFilaments = await prismadb.tags
        .findFirst({
          where: { id: tag.id },
        })
        ?.filaments();

      if (tagFilaments && tagFilaments.length === 1) {
        // If the tag has no more relationships with other filaments, delete it
        await prismadb.tags.delete({ where: { id: tag.id } });
      } else {
        // Remove the association between the tag and the current filament
        await prismadb.filament.update({
          where: { id: id },
          data: {
            tags: {
              disconnect: { id: tag.id },
            },
          },
        });
      }
    }
  }

  await prismadb.filament.update({
    where: { id: id },
    data: filamentData,
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
