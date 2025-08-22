import { z } from 'zod';

// Product schemas
export const insertProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be non-negative"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().optional(),
  stock: z.number().int().min(0, "Stock must be non-negative"),
  minStock: z.number().int().min(0, "Min stock must be non-negative").optional(),
});

export const selectProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  sku: z.string(),
  category: z.string().nullable(),
  stock: z.number(),
  minStock: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Customer schemas
export const insertCustomerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const selectCustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Invoice schemas
export const insertInvoiceItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be non-negative"),
  total: z.number().min(0, "Total must be non-negative"),
});

export const insertInvoiceSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  items: z.array(insertInvoiceItemSchema).min(1, "At least one item is required"),
  subtotal: z.number().min(0, "Subtotal must be non-negative"),
  tax: z.number().min(0, "Tax must be non-negative"),
  total: z.number().min(0, "Total must be non-negative"),
  status: z.enum(['pending', 'paid', 'overdue', 'cancelled']).default('pending'),
  issueDate: z.string(),
  dueDate: z.string(),
});

export const selectInvoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  items: z.array(insertInvoiceItemSchema),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
  status: z.enum(['pending', 'paid', 'overdue', 'cancelled']),
  issueDate: z.string(),
  dueDate: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// User schemas
export const insertUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export const selectUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Type exports
export type InsertProductSchema = z.infer<typeof insertProductSchema>;
export type SelectProductSchema = z.infer<typeof selectProductSchema>;
export type InsertCustomerSchema = z.infer<typeof insertCustomerSchema>;
export type SelectCustomerSchema = z.infer<typeof selectCustomerSchema>;
export type InsertInvoiceSchema = z.infer<typeof insertInvoiceSchema>;
export type SelectInvoiceSchema = z.infer<typeof selectInvoiceSchema>;
export type InsertUserSchema = z.infer<typeof insertUserSchema>;
export type SelectUserSchema = z.infer<typeof selectUserSchema>;