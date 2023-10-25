import { Color, Filament, Manufacturer, Material } from '@prisma/client';

export type Filaments = {
    id: string;
    userId: string;
    status: string;
    diameter: number;
    manufacturer: string; 
    material: string;
    color: string;
    weight: number;
    remainingWeight: number;
    createdAt: Date;
    updatedAt: Date | null;
    tags: string[];
}