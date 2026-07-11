import { z } from 'zod';

export const ThemeSchema = z.enum(['light', 'dark']);
export type Theme = z.infer<typeof ThemeSchema>;

export const DeviceSchema = z.enum(['phone', 'tablet', 'desktop']);
export type Device = z.infer<typeof DeviceSchema>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  theme: ThemeSchema,
  device: DeviceSchema,
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export const UserUpdateSchema = UserSchema.omit({ id: true }).partial();
