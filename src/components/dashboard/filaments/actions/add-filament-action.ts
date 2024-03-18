'use server';

import { FilamentService } from '@/lib/services/filament-service';
import { CreateFilamentDTO } from '@/types/database';
import { revalidatePath } from 'next/cache';

export async function addFilamentAction(userId: string, data: CreateFilamentDTO) {
  const { createFilament } = FilamentService;
  try {
    await createFilament(data, userId);
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath('/dashboard/filaments');
  }
}
