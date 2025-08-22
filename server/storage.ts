import {
  users,
  products,
  customers,
  invoices,
  invoiceItems,
  type User,
  type UpsertUser,
  type Product,
  type InsertProduct,
  type Customer,
  type InsertCustomer,
  type Invoice,
  type InsertInvoice,
  type InvoiceItem,
  type InsertInvoiceItem,
  type InvoiceWithCustomer,
  type ProductWithStock,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, ilike, and, sql, count } from "drizzle-orm";

import {
  Product as ProductModel,
  Customer as CustomerModel,
  Invoice as InvoiceModel,
  IProduct,
  ICustomer,
  IInvoice,
  InsertProduct as InsertProductSchema,
  InsertCustomer as InsertCustomerSchema,
  InsertInvoice as InsertInvoiceSchema,
  ProductWithStock as ProductWithStockSchema,
} from '@shared/schema';
import { Types } from 'mongoose';

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Product operations
  getProducts(page?: number, limit?: number, search?: string): Promise<{ products: ProductWithStock[]; total: number }>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  updateStock(productId: number, quantity: number): Promise<boolean>;
  getLowStockProducts(): Promise<ProductWithStock[]>;

  // Customer operations
  getCustomers(page?: number, limit?: number, search?: string): Promise<{ customers: Customer[]; total: number }>;
  getCustomer(id: number): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: number, customer: Partial<InsertCustomer>): Promise<Customer | undefined>;
  deleteCustomer(id: number): Promise<boolean>;

  // Invoice operations
  getInvoices(page?: number, limit?: number, search?: string, status?: string): Promise<{ invoices: InvoiceWithCustomer[]; total: number }>;
  getInvoice(id: number): Promise<InvoiceWithCustomer | undefined>;
  createInvoice(invoice: InsertInvoice, items: InsertInvoiceItem[]): Promise<InvoiceWithCustomer>;
  updateInvoiceStatus(id: number, status: string): Promise<boolean>;
  deleteInvoice(id: number): Promise<boolean>;
  getNextInvoiceNumber(): Promise<string>;

  // Dashboard stats
  getDashboardStats(): Promise<{
    totalProducts: number;
    lowStockItems: number;
    totalRevenue: string;
    pendingInvoices: number;
  }>;
}

class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Product operations
  async getProducts(page = 1, limit = 10, search = ""): Promise<{ products: ProductWithStock[]; total: number }> {
    const offset = (page - 1) * limit;

    const whereClause = search
      ? ilike(products.name, `%${search}%`)
      : undefined;

    const [productsResult, totalResult] = await Promise.all([
      db
        .select()
        .from(products)
        .where(whereClause)
        .orderBy(desc(products.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: count() })
        .from(products)
        .where(whereClause)
    ]);

    const productsWithStock = productsResult.map(product => ({
      ...product,
      stockStatus: product.stock <= 0 ? "out_of_stock" as const
        : product.stock <= (product.minStock || 10) ? "low_stock" as const
        : "in_stock" as const
    }));

    return {
      products: productsWithStock,
      total: totalResult[0].count
    };
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount! > 0;
  }

  async updateStock(productId: number, quantity: number): Promise<boolean> {
    const result = await db
      .update(products)
      .set({
        stock: sql`${products.stock} + ${quantity}`,
        updatedAt: new Date()
      })
      .where(eq(products.id, productId));
    return result.rowCount! > 0;
  }

  async getLowStockProducts(): Promise<ProductWithStock[]> {
    const lowStockProducts = await db
      .select()
      .from(products)
      .where(sql`${products.stock} <= ${products.minStock}`)
      .orderBy(asc(products.stock));

    return lowStockProducts.map(product => ({
      ...product,
      stockStatus: product.stock <= 0 ? "out_of_stock" as const : "low_stock" as const
    }));
  }

  // Customer operations
  async getCustomers(page = 1, limit = 10, search = ""): Promise<{ customers: Customer[]; total: number }> {
    const offset = (page - 1) * limit;

    const whereClause = search
      ? ilike(customers.name, `%${search}%`)
      : undefined;

    const [customersResult, totalResult] = await Promise.all([
      db
        .select()
        .from(customers)
        .where(whereClause)
        .orderBy(desc(customers.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: count() })
        .from(customers)
        .where(whereClause)
    ]);

    return {
      customers: customersResult,
      total: totalResult[0].count
    };
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.id, id));
    return customer;
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const [newCustomer] = await db.insert(customers).values(customer).returning();
    return newCustomer;
  }

  async updateCustomer(id: number, customer: Partial<InsertCustomer>): Promise<Customer | undefined> {
    const [updatedCustomer] = await db
      .update(customers)
      .set({ ...customer, updatedAt: new Date() })
      .where(eq(customers.id, id))
      .returning();
    return updatedCustomer;
  }

  async deleteCustomer(id: number): Promise<boolean> {
    const result = await db.delete(customers).where(eq(customers.id, id));
    return result.rowCount! > 0;
  }

  // Invoice operations
  async getInvoices(page = 1, limit = 10, search = "", status = ""): Promise<{ invoices: InvoiceWithCustomer[]; total: number }> {
    const offset = (page - 1) * limit;

    const whereConditions = [];
    if (search) {
      whereConditions.push(ilike(invoices.invoiceNumber, `%${search}%`));
    }
    if (status) {
      whereConditions.push(eq(invoices.status, status));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const [invoicesResult, totalResult] = await Promise.all([
      db
        .select({
          invoice: invoices,
          customer: customers,
        })
        .from(invoices)
        .leftJoin(customers, eq(invoices.customerId, customers.id))
        .where(whereClause)
        .orderBy(desc(invoices.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: count() })
        .from(invoices)
        .where(whereClause)
    ]);

    const invoicesWithItems = await Promise.all(
      invoicesResult.map(async (row) => {
        const items = await db
          .select({
            invoiceItem: invoiceItems,
            product: products,
          })
          .from(invoiceItems)
          .leftJoin(products, eq(invoiceItems.productId, products.id))
          .where(eq(invoiceItems.invoiceId, row.invoice.id));

        return {
          ...row.invoice,
          customer: row.customer!,
          items: items.map(item => ({
            ...item.invoiceItem,
            product: item.product!,
          })),
        };
      })
    );

    return {
      invoices: invoicesWithItems,
      total: totalResult[0].count
    };
  }

  async getInvoice(id: number): Promise<InvoiceWithCustomer | undefined> {
    const [invoiceRow] = await db
      .select({
        invoice: invoices,
        customer: customers,
      })
      .from(invoices)
      .leftJoin(customers, eq(invoices.customerId, customers.id))
      .where(eq(invoices.id, id));

    if (!invoiceRow) return undefined;

    const items = await db
      .select({
        invoiceItem: invoiceItems,
        product: products,
      })
      .from(invoiceItems)
      .leftJoin(products, eq(invoiceItems.productId, products.id))
      .where(eq(invoiceItems.invoiceId, id));

    return {
      ...invoiceRow.invoice,
      customer: invoiceRow.customer!,
      items: items.map(item => ({
        ...item.invoiceItem,
        product: item.product!,
      })),
    };
  }

  async createInvoice(invoice: InsertInvoice, items: InsertInvoiceItem[]): Promise<InvoiceWithCustomer> {
    const [newInvoice] = await db.insert(invoices).values(invoice).returning();

    const invoiceItemsWithInvoiceId = items.map(item => ({
      ...item,
      invoiceId: newInvoice.id,
    }));

    await db.insert(invoiceItems).values(invoiceItemsWithInvoiceId);

    // Update stock for each product
    for (const item of items) {
      await this.updateStock(item.productId, -item.quantity);
    }

    const result = await this.getInvoice(newInvoice.id);
    return result!;
  }

  async updateInvoiceStatus(id: number, status: string): Promise<boolean> {
    const result = await db
      .update(invoices)
      .set({ status, updatedAt: new Date() })
      .where(eq(invoices.id, id));
    return result.rowCount! > 0;
  }

  async deleteInvoice(id: number): Promise<boolean> {
    // Delete invoice items first
    await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, id));

    // Delete invoice
    const result = await db.delete(invoices).where(eq(invoices.id, id));
    return result.rowCount! > 0;
  }

  async getNextInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const [lastInvoice] = await db
      .select()
      .from(invoices)
      .where(ilike(invoices.invoiceNumber, `INV-${year}-%`))
      .orderBy(desc(invoices.invoiceNumber))
      .limit(1);

    if (!lastInvoice) {
      return `INV-${year}-001`;
    }

    const lastNumber = parseInt(lastInvoice.invoiceNumber.split('-')[2]);
    const nextNumber = lastNumber + 1;
    return `INV-${year}-${nextNumber.toString().padStart(3, '0')}`;
  }

  // Dashboard stats
  async getDashboardStats(): Promise<{
    totalProducts: number;
    lowStockItems: number;
    totalRevenue: string;
    pendingInvoices: number;
  }> {
    const [productsCount, lowStockCount, revenueSum, pendingCount] = await Promise.all([
      db.select({ count: count() }).from(products),
      db.select({ count: count() }).from(products).where(sql`${products.stock} <= ${products.minStock}`),
      db.select({ sum: sql<string>`COALESCE(SUM(${invoices.total}), 0)` }).from(invoices).where(eq(invoices.status, 'paid')),
      db.select({ count: count() }).from(invoices).where(eq(invoices.status, 'pending')),
    ]);

    return {
      totalProducts: productsCount[0].count,
      lowStockItems: lowStockCount[0].count,
      totalRevenue: revenueSum[0].sum || "0",
      pendingInvoices: pendingCount[0].count,
    };
  }
}

export const storage = new DatabaseStorage();