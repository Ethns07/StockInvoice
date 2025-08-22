
export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  minStock: number;
  description?: string;
  category?: string;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
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
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    sku: 'WH-001',
    price: 99.99,
    stock: 25,
    minStock: 10,
    description: 'High-quality wireless headphones',
    category: 'Electronics',
    stockStatus: 'in_stock'
  },
  {
    id: '2',
    name: 'Gaming Mouse',
    sku: 'GM-002',
    price: 49.99,
    stock: 5,
    minStock: 10,
    description: 'RGB gaming mouse',
    category: 'Electronics',
    stockStatus: 'low_stock'
  },
  {
    id: '3',
    name: 'Mechanical Keyboard',
    sku: 'MK-003',
    price: 129.99,
    stock: 0,
    minStock: 5,
    description: 'Mechanical gaming keyboard',
    category: 'Electronics',
    stockStatus: 'out_of_stock'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-0123',
    address: '123 Main St',
    city: 'New York',
    country: 'USA'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1-555-0456',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    country: 'USA'
  }
];

export const mockInvoices: Invoice[] = [
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
    dueDate: '2024-02-15'
  }
];
