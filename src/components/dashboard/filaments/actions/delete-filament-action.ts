'use server';

import { FilamentService } from '@/lib/services/filament-service';
import { revalidatePath } from 'next/cache';

export async function deleteMultipleFilamentAction(ids: string[]) {
  const { deleteMultipleFilaments } = FilamentService;
  try {
    await deleteMultipleFilaments(ids);
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath('/dashboard/filaments');
  }
}

export async function deleteFilamentAction(id: string) {
  const { deleteFilament } = FilamentService;
  try {
    await deleteFilament(id);
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath('/dashboard/filaments');
  }
}
