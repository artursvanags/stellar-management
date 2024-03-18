import { CreateFilamentDTO, FilamentDTO } from '@/types/database';

import {
  getFilament,
  getAllFilaments,
  createFilament,
  deleteFilament,
  updateFilament,
  createTag,
  deleteMultipleFilaments,
  updateMultipleFilaments,
} from '@/lib/repositories/filament-repository';

export class FilamentService {
  static async getFilament(id: string, userId: string): Promise<FilamentDTO | null> {
    try {
      const filament = await getFilament(id, userId);
      return filament;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get filament');
    }
  }

  static async getMultipleFilaments(userId: string): Promise<FilamentDTO[]> {
    try {
      const filaments = await getAllFilaments(userId);
      return filaments;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to multiple filaments');
    }
  }

  static async createTag(name: string, filamentId: string): Promise<void> {
    try {
      await createTag(name, filamentId);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create tag');
    }
  }

  static async createFilament(data: CreateFilamentDTO, userId: string): Promise<void> {
    try {
      const newFilament = await createFilament(data, userId);
      const tags = data.tags;
      if (tags) {
        for (const tag of tags) {
          await this.createTag(tag.name, newFilament.id);
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create filament');
    }
  }

  static async createMultipleFilaments(data: CreateFilamentDTO[], userId: string): Promise<void> {
    try {
      for (const filament of data) {
        await this.createFilament(filament, userId);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create multiple filaments');
    }
  }

  static async updateFilament(id: string, data: Partial<FilamentDTO>): Promise<void> {
    try {
      await updateFilament(id, data);
    } catch (error) {
      console.error(error);
    }
  }

  static async updateMultipleFilaments(ids: string[], data: Partial<FilamentDTO>): Promise<void> {
    try {
      await updateMultipleFilaments(ids, data);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update multiple filaments');
    }
  }

  static async deleteFilament(id: string): Promise<void> {
    try {
      await deleteFilament(id);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete filament');
    }
  }

  static async deleteMultipleFilaments(ids: string[]): Promise<void> {
    try {
      await deleteMultipleFilaments(ids);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete filament');
    }
  }
}
