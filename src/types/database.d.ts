import { Filament, FilamentStatus, Tags, User, UserSettings } from '@prisma/client';
import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & { id: string };
  }
}

export type FilamentDTO = Filament & { tags: Tags[] };

export interface CreateFilamentDTO {
  diameter: string;
  manufacturer: string;
  material: string;
  color: string;
  weight: number;
  remainingWeight: number;
  isFavorite: boolean;
  status: FilamentStatus;
  tags?: CreateTagsDTO[];
}

export interface CreateTagsDTO {
  name: string;
}

export interface UserData extends User {
  settings: UserSettings;
}