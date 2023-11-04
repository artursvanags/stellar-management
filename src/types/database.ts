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
    tags: (string | null)[];
}