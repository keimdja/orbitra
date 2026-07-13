import { z } from 'zod';

export const DashboardSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  icon: z.string(),
  accent: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'accent must be a hex color'),
  description: z.string(),
  sortOrder: z.number(),
});

export type Dashboard = z.infer<typeof DashboardSchema>;

export const DashboardUpdateSchema = DashboardSchema.omit({ id: true }).partial();
