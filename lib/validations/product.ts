import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100, 'Name must be less than 100 characters'),
  code: z.string().min(1, 'Product code is required').max(50, 'Code must be less than 50 characters'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  image: z.string().url('Image must be a valid URL'),
  category: z.string().max(50, 'Category must be less than 50 characters').optional(),
});

export type ProductInput = z.infer<typeof ProductSchema>;
