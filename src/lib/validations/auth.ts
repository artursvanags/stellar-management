import * as z from 'zod';

export const userAuthSchema = z.object({
  email: z.string().min(1, 'Email is required.').email(),
});
