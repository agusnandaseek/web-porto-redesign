import { z } from 'zod';

export const LayoutElementSchema = z.object({
  id: z.string(),
  type: z.string(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  zIndex: z.number().default(1),
  content: z.record(z.string(), z.any()).optional(),
  style: z.record(z.string(), z.any()).optional(),
});

export const LayoutSchema = z.array(LayoutElementSchema);

export function validateLayoutData(data) {
  try {
    const result = LayoutSchema.safeParse(data);
    if (!result.success) {
      console.error('Invalid layout JSON structure:', result.error);
      return { valid: false, error: result.error };
    }
    return { valid: true, data: result.data };
  } catch (err) {
    return { valid: false, error: err };
  }
}
