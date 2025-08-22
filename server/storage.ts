// In-memory storage implementation
import { insertProductSchema, insertCustomerSchema, insertInvoiceSchema } from "@shared/schema";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  sku: string;
  category?: string;
  stock: number;
  minStock?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

class InMemoryStorage {
  private products: Map<string, Product> = new Map();
  private customers: Map<string, Customer> = new Map();
  private invoices: Map<string, Invoice> = new Map();
  private users: Map<string, User> = new Map();
  private invoiceCounter = 1;

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock products
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones',
        price: 99.99,
        sku: 'WH001',
        category: 'Electronics',
        stock: 25,
        minStock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Laptop Stand',
        description: 'Adjustable laptop stand',
        price: 49.99,
        sku: 'LS002',
        category: 'Accessories',
        stock: 15,
        minStock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-0123',
        address: '123 Main St, City, State',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '555-0456',
        address: '456 Oak Ave, City, State',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const mockInvoices: Invoice[] = [
      {
        id: '1',
        invoiceNumber: 'INV-0001',
        customerId: '1',
        customerName: 'John Doe',
        items: [
          {
            id: '1',
            productId: '1',
            productName: 'Wireless Headphones',
            quantity: 2,
            price: 99.99,
            total: 199.98
          }
        ],
        subtotal: 199.98,
        tax: 20.00,
        total: 219.98,
        status: 'paid',
        issueDate: '2024-01-15',
        dueDate: '2024-02-15',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    mockProducts.forEach(p => this.products.set(p.id, p));
    mockCustomers.forEach(c => this.customers.set(c.id, c));
    mockInvoices.forEach(i => this.invoices.set(i.id, i));
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(user: Partial<User>): Promise<User> {
    const userId = user.id || this.generateId();
    const existingUser = this.users.get(userId);

    const userData: User = {
      id: userId,
      name: user.name || existingUser?.name || 'Unknown User',
      email: user.email || existingUser?.email || 'unknown@example.com',
      createdAt: existingUser?.createdAt || new Date(),
      updatedAt: new Date()
    };

    this.users.set(userId, userData);
    return userData;
  }

  async getDashboardStats(): Promise<any> {
    const totalProducts = this.products.size;
    const totalCustomers = this.customers.size;
    const totalInvoices = this.invoices.size;

    let totalRevenue = 0;
    let pendingInvoices = 0;

    for (const invoice of this.invoices.values()) {
      totalRevenue += invoice.total;
      if (invoice.status === 'pending') pendingInvoices++;
    }

    return {
      totalProducts,
      totalCustomers,
      totalInvoices,
      totalRevenue,
      pendingInvoices,
      lowStockProducts: Array.from(this.products.values()).filter(p => p.stock <= (p.minStock || 0)).length
    };
  }

  // Product operations
  async getProducts(page = 1, limit = 10, search = ""): Promise<{ products: Product[]; total: number }> {
    let products = Array.from(this.products.values());

    if (search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
      );
    }

    const total = products.length;
    const offset = (page - 1) * limit;
    products = products.slice(offset, offset + limit);

    return { products, total };
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: any): Promise<Product> {
    const id = this.generateId();
    const newProduct: Product = {
      ...product,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<any>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...product, updatedAt: new Date() };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  async updateStock(productId: string, quantity: number): Promise<boolean> {
    const product = this.products.get(productId);
    if (!product) return false;

    product.stock += quantity;
    product.updatedAt = new Date();
    return true;
  }

  async getLowStockProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.stock <= (p.minStock || 0));
  }

  // Customer operations
  async getCustomers(page = 1, limit = 10, search = ""): Promise<{ customers: Customer[]; total: number }> {
    let customers = Array.from(this.customers.values());

    if (search) {
      customers = customers.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    const total = customers.length;
    const offset = (page - 1) * limit;
    customers = customers.slice(offset, offset + limit);

    return { customers, total };
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createCustomer(customer: any): Promise<Customer> {
    const id = this.generateId();
    const newCustomer: Customer = {
      ...customer,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.customers.set(id, newCustomer);
    return newCustomer;
  }

  async updateCustomer(id: string, customer: Partial<any>): Promise<Customer | undefined> {
    const existing = this.customers.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...customer, updatedAt: new Date() };
    this.customers.set(id, updated);
    return updated;
  }

  async deleteCustomer(id: string): Promise<boolean> {
    return this.customers.delete(id);
  }

  // Invoice operations
  async getInvoices(page = 1, limit = 10, search = "", status = ""): Promise<{ invoices: Invoice[]; total: number }> {
    let invoices = Array.from(this.invoices.values());

    if (search) {
      invoices = invoices.filter(i => 
        i.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
        i.customerName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      invoices = invoices.filter(i => i.status === status);
    }

    const total = invoices.length;
    const offset = (page - 1) * limit;
    invoices = invoices.slice(offset, offset + limit);

    return { invoices, total };
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    return this.invoices.get(id);
  }

  async createInvoice(invoice: any, items?: any[]): Promise<Invoice> {
    const id = this.generateId();
    const invoiceNumber = `INV-${String(this.invoiceCounter++).padStart(4, '0')}`;

    const customer = this.customers.get(invoice.customerId);
    const customerName = customer?.name || 'Unknown Customer';

    const newInvoice: Invoice = {
      ...invoice,
      id,
      invoiceNumber,
      customerName,
      items: items || invoice.items || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.invoices.set(id, newInvoice);
    return newInvoice;
  }

  async getNextInvoiceNumber(): Promise<string> {
    return `INV-${String(this.invoiceCounter).padStart(4, '0')}`;
  }

  async updateInvoiceStatus(id: string, status: string): Promise<boolean> {
    const invoice = this.invoices.get(id);
    if (!invoice) return false;

    invoice.status = status as any;
    invoice.updatedAt = new Date();
    return true;
  }

  async updateInvoice(id: string, invoice: Partial<any>): Promise<Invoice | undefined> {
    const existing = this.invoices.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...invoice, updatedAt: new Date() };
    this.invoices.set(id, updated);
    return updated;
  }

  async deleteInvoice(id: string): Promise<boolean> {
    return this.invoices.delete(id);
  }
}

export const storage = new InMemoryStorage();