'use server';

import prismadb from '@/lib/utils/database';
import { CreateFilamentDTO, FilamentDTO } from '@/types/database';

/**
 * Finds the first filament matching the given id and userId.
 * @param id The id of the filament.
 * @param userId The id of the user owning the filament.
 * @returns A promise that resolves to the found filament or null.
 */
export async function getFilament(id: string, userId: string): Promise<FilamentDTO | null> {
  return prismadb.filament.findFirst({
    where: { id, userId },
    include: { tags: true },
  });
}

/**
 * Finds all filaments owned by the given user.
 * @param userId The id of the user.
 * @returns A promise that resolves to an array of found filaments.
 */
export async function getAllFilaments(userId: string): Promise<FilamentDTO[]> {
  return prismadb.filament.findMany({
    where: { userId },
    include: { tags: true },
  });
}

/**
 * Creates a new filament with the provided data and associates it with the given user.
 * @param data The data for the new filament.
 * @param userId The id of the user to associate the filament with.
 * @returns An object representing the created filament.
 */
export async function createFilament(data: CreateFilamentDTO, userId: string): Promise<FilamentDTO> {
  const filament = await prismadb.filament.create({
    data: {
      ...data,
      userId: userId,
      tags: { create: data.tags },
    },
    include: { tags: true },
  });
  return filament;
}

/**
 * Updates a filament with the provided id and new data.
 * @param id The id of the filament to update.
 * @param data The new data for the filament.
 * @returns A promise that resolves when the filament has been updated.
 */
export async function updateFilament(id: string, data: Partial<CreateFilamentDTO>): Promise<void> {
  await prismadb.filament.update({
    where: { id },
    data: {
      ...data,
      tags: { create: data.tags },
    },
  });
}

/**
 * Updates multiple filaments with the provided ids and new data.
 * @param ids The ids of the filaments to update.
 * @param data The new data for the filaments.
 * @returns A promise that resolves when the filaments have been updated.
 */
export async function updateMultipleFilaments(ids: string[], data: Partial<CreateFilamentDTO>): Promise<void> {
  await prismadb.filament.updateMany({
    where: {
      id: { in: ids },
    },
    data: {
      ...data,
    },
  });
}

/**
 * Deletes a filament with the provided id.
 * @param id The id of the filament to delete.
 * @returns A promise that resolves when the filament has been deleted.
 */
export async function deleteFilament(id: string): Promise<void> {
  await prismadb.filament.delete({
    where: { id },
  });
}

/**
 * Deletes a filament with the provided id.
 * @param id The id of the filament to delete.
 * @returns A promise that resolves when the filament has been deleted.
 */
export async function deleteMultipleFilaments(ids: string[]): Promise<void> {
  await prismadb.filament.deleteMany({
    where: { id: { in: ids } },
  });
}

/**
 * Creates a new tag with the provided name and associates it with the given filament.
 * @param name The name of the tag.
 * @param id The id of the filament to associate the tag with.
 * @returns A promise that resolves when the tag has been created.
 */
export async function createTag(name: string, id: string): Promise<void> {
  await prismadb.tags.create({
    data: {
      name,
      filaments: {
        connect: { id: id },
      },
    },
  });
}

/**
 * Deletes a tag with the provided id.
 * @param id The id of the filament to associate the tag with.
 * @returns A promise that resolves when the tag has been created.
 */
export async function deleteTag(id: string): Promise<void> {
  await prismadb.tags.delete({
    where: { id: id },
  });
}

/**
 * Deletes tags if they are orphaned (not associated with any filament).
 * @param tagIds The ids of the tags to check and delete if orphaned.
 * @returns A promise that resolves when the tags have been deleted.
 */
export async function deleteTagsIfOrphan(tagIds: string[]): Promise<void> {
  await prismadb.tags.deleteMany({
    where: {
      id: { in: tagIds },
      filaments: { none: {} },
    },
  });
}
