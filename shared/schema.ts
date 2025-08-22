import { z } from 'zod';

// Zod schemas for validation
export const insertUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const insertProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  sku: z.string().min(1),
  category: z.string().optional(),
  stock: z.number().min(0),
  minStock: z.number().min(0).optional(),
});

export const insertCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const insertInvoiceItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  total: z.number().min(0),
});

export const insertInvoiceSchema = z.object({
  customerId: z.string(),
  items: z.array(insertInvoiceItemSchema),
  subtotal: z.number().min(0),
  tax: z.number().min(0),
  total: z.number().min(0),
  status: z.enum(['pending', 'paid', 'overdue', 'cancelled']).default('pending'),
  issueDate: z.string(),
  dueDate: z.string(),
});

export type InsertUserSchema = z.infer<typeof insertUserSchema>;
export type InsertProductSchema = z.infer<typeof insertProductSchema>;
export type InsertCustomerSchema = z.infer<typeof insertCustomerSchema>;
export type InsertInvoiceItemSchema = z.infer<typeof insertInvoiceItemSchema>;
export type InsertInvoiceSchema = z.infer<typeof insertInvoiceSchema>;