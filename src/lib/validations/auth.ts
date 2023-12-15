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
