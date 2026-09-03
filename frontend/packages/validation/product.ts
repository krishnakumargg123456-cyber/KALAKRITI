import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().min(1),
});

export type ProductInput = z.infer<typeof productSchema>;
