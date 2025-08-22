
import { Schema, model, Document, Types } from 'mongoose';
import { z } from 'zod';

// Session storage interface (required for Replit Auth)
export interface ISession extends Document {
  _id: string;
  sess: any;
  expire: Date;
}

const sessionSchema = new Schema<ISession>({
  _id: { type: String, required: true },
  sess: { type: Schema.Types.Mixed, required: true },
  expire: { type: Date, required: true, index: true }
});

export const Session = model<ISession>('Session', sessionSchema);

// User storage interface (required for Replit Auth)
export interface IUser extends Document {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  _id: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  firstName: String,
  lastName: String,
  profileImageUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const User = model<IUser>('User', userSchema);

// Product interface
export interface IProduct extends Document {
  name: string;
  sku: string;
  description?: string;
  category?: string;
  price: number;
  stock: number;
  minStock: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, maxlength: 255 },
  sku: { type: String, required: true, unique: true, maxlength: 100 },
  description: String,
  category: { type: String, maxlength: 100 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  minStock: { type: Number, default: 10 },
  imageUrl: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Product = model<IProduct>('Product', productSchema);

// Customer interface
export interface ICustomer extends Document {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<ICustomer>({
  name: { type: String, required: true, maxlength: 255 },
  email: { type: String, maxlength: 255 },
  phone: { type: String, maxlength: 50 },
  address: String,
  city: { type: String, maxlength: 100 },
  state: { type: String, maxlength: 100 },
  zipCode: { type: String, maxlength: 20 },
  country: { type: String, maxlength: 100 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Customer = model<ICustomer>('Customer', customerSchema);

// Invoice Item interface
export interface IInvoiceItem {
  productId: Types.ObjectId;
  quantity: number;
  unitPrice: number;
  total: number;
}

const invoiceItemSchema = new Schema<IInvoiceItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  total: { type: Number, required: true }
});

// Invoice interface
export interface IInvoice extends Document {
  invoiceNumber: string;
  customerId: Types.ObjectId;
  userId: string;
  issueDate: Date;
  dueDate?: Date;
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  notes?: string;
  items: IInvoiceItem[];
  createdAt: Date;
  updatedAt: Date;
}

const invoiceSchema = new Schema<IInvoice>({
  invoiceNumber: { type: String, required: true, unique: true, maxlength: 50 },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  userId: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: Date,
  subtotal: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'overdue', 'cancelled'], default: 'pending' },
  notes: String,
  items: [invoiceItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Invoice = model<IInvoice>('Invoice', invoiceSchema);

// Zod schemas for validation
export const insertProductSchema = z.object({
  name: z.string().max(255),
  sku: z.string().max(100),
  description: z.string().optional(),
  category: z.string().max(100).optional(),
  price: z.number(),
  stock: z.number().default(0),
  minStock: z.number().default(10),
  imageUrl: z.string().optional(),
  isActive: z.boolean().default(true)
});

export const insertCustomerSchema = z.object({
  name: z.string().max(255),
  email: z.string().max(255).optional(),
  phone: z.string().max(50).optional(),
  address: z.string().optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  zipCode: z.string().max(20).optional(),
  country: z.string().max(100).optional()
});

export const insertInvoiceItemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  total: z.number()
});

export const insertInvoiceSchema = z.object({
  invoiceNumber: z.string().max(50),
  customerId: z.string(),
  userId: z.string(),
  issueDate: z.date().optional(),
  dueDate: z.date().optional(),
  subtotal: z.number(),
  tax: z.number().default(0),
  total: z.number(),
  status: z.enum(['pending', 'paid', 'overdue', 'cancelled']).default('pending'),
  notes: z.string().optional(),
  items: z.array(insertInvoiceItemSchema)
});

// Type exports
export type UpsertUser = Partial<IUser>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type InsertInvoiceItem = z.infer<typeof insertInvoiceItemSchema>;

// Extended types with relations
export type InvoiceWithCustomer = IInvoice & {
  customer: ICustomer;
  items: (IInvoiceItem & { product: IProduct })[];
};

export type ProductWithStock = IProduct & {
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
};
