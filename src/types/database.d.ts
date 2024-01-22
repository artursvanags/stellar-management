import { Tag } from '@prisma/client';
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
    diameter: string;
    manufacturer: string;
    material: string;
    color: string;
    weight: number;
    remainingWeight: number;
    createdAt: Date;
    updatedAt: Date | null;
    isFavorite: boolean;
    tags: Tag[];
}
