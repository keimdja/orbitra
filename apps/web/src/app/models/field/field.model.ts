import { z } from 'zod';

export const FieldTypeSchema = z.enum(['text', 'longtext', 'number', 'date', 'checkbox']);
export type FieldType = z.infer<typeof FieldTypeSchema>;

export const FieldSchema = z.object({
  id: z.string(),
  dashboardId: z.string(),
  label: z.string(),
  type: FieldTypeSchema,
  sortOrder: z.number(),
  showAsWidget: z.boolean(),
});

export type Field = z.infer<typeof FieldSchema>;

export const FieldUpdateSchema = FieldSchema.omit({ id: true }).partial();
