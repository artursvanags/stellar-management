import type { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & { id: string };
  }
}

export type Filaments = {
    id: string;
    userId: string;
    status: string;
    diameter: number;
    manufacturer: string | null;
    material: string | null;
    color: string | null;
    weight: number;
    remainingWeight: number;
    createdAt: Date;
    updatedAt: Date | null;
    isFavorite: boolean;
    tags: (string | null)[];
}