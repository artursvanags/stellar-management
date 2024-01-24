import { Filaments } from '@/types/database';
import * as z from 'zod';

export const userAuthSchema = z.object({
  email: z.string().min(1, 'Email is required.').email(),
});

export const setupAuthSchema = z.object({
  name: z
    .string()
    .min(1, 'Your name cannot be empty.')
    .max(40, 'Your name must contain at most 40 characters.'),
});

export const billingAddressSchema = z.object({
  country: z.string().min(1, 'Country is required.'),
  address: z.string().min(1, 'Address is required.'),
  city: z.string().min(1, 'City is required.'),
  state: z.string(),
  zip: z.string().min(1, 'Zip is required.'),
  phone: z.string().min(1, 'Phone is required.'),
});

export const userSettingsSchema = z.object({
  weight_threshold: z.string(),
  auto_archive: z.boolean(),
});

export const tagsSchema = z.object({
  tags: z.array(z.object({ id: z.string(), name: z.string() })),
});

export const filamentSchema = z.object({
  filaments: z.array(
    z.object({
      manufacturer: z.string().max(30, 'Manufacturer must contain at most 30 characters.').min(1),
      material: z.string().max(30, 'Material must contain at most 30 characters.').min(1),
      diameter: z.string(),
      color: z.string().max(30, 'Color must contain at most 30 characters.').min(1),
      weight: z.string().min(1),
      remainingWeight: z.string().min(1),
      status: z.string(),
      tags: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
        }),
      ),
    }),
  ),
});
