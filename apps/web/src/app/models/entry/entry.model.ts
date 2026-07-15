import { z } from 'zod';

export const FieldValueSchema = z.union([z.string(), z.number(), z.boolean(), z.date()]);
export type FieldValue = z.infer<typeof FieldValueSchema>;

export const EntrySchema = z.object({
  id: z.string(),
  dashboardId: z.string(),
  // System-managed, set once at creation — independent of any user-defined
  // date-type Field. Exists so "last updated"/chronological sorting has a
  // reliable value even when a dashboard has no date field at all.
  createdAt: z.date(),
  values: z.record(z.string(), FieldValueSchema),
});

export type Entry = z.infer<typeof EntrySchema>;

export const EntryUpdateSchema = EntrySchema.omit({ id: true }).partial();
