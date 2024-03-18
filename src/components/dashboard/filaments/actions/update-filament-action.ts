'use server';

import { FilamentService } from '@/lib/services/filament-service';
import { FilamentDTO } from '@/types/database';
import { revalidatePath } from 'next/cache';

export async function updateMultipleFilamentAction(ids: string[], data: Partial<FilamentDTO>) {
  const { updateMultipleFilaments } = FilamentService;
  try {
    await updateMultipleFilaments(ids, data);
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath('/dashboard/filaments');
  }
}

export async function updateFilamentAction(id: string, data: Partial<FilamentDTO>) {
  const { updateFilament } = FilamentService;
  try {
    await updateFilament(id, data);
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath('/dashboard/filaments');
  }
}
