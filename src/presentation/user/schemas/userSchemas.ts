import { z } from 'zod';

export const getByIdSchema = z.object({
  id: z.string().uuid({ message: 'Invalid user id format' })
});

const baseUserSchema = z.object({
  email: z.string().email({ message: 'Valid email is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

export const updateUserSchema = baseUserSchema.partial();