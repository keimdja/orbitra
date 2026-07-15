import { z } from 'zod';

export const ThemeSchema = z.enum(['light', 'dark']);
export type Theme = z.infer<typeof ThemeSchema>;

export const DeviceSchema = z.enum(['phone', 'tablet', 'desktop']);
export type Device = z.infer<typeof DeviceSchema>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Optional: a User may be auto-bootstrapped (e.g. by Create Dashboard) before
  // Settings ever collects a real name/email — there's no auth requiring these.
  email: z.email().optional(),
  theme: ThemeSchema,
  device: DeviceSchema.optional(),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export const UserUpdateSchema = UserSchema.omit({ id: true }).partial();
