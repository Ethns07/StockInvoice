
export const mockProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    sku: 'WH001',
    category: 'Electronics',
    stock: 25,
    minStock: 10,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand',
    price: 49.99,
    sku: 'LS002',
    category: 'Accessories',
    stock: 15,
    minStock: 5,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '3',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI',
    price: 79.99,
    sku: 'UH003',
    category: 'Electronics',
    stock: 3,
    minStock: 5,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  }
];

export const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-0123',
    address: '123 Main St, City, State 12345',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-0456',
    address: '456 Oak Ave, City, State 12345',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11')
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '555-0789',
    address: '789 Pine Rd, City, State 12345',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  }
];

export const mockInvoices = [
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
        price: 199.99,
        total: 399.98
      }
    ],
    subtotal: 399.98,
    tax: 40.00,
    total: 439.98,
    status: 'paid' as const,
    issueDate: '2024-01-15',
    dueDate: '2024-02-15',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    invoiceNumber: 'INV-0002',
    customerId: '2',
    customerName: 'Jane Smith',
    items: [
      {
        id: '2',
        productId: '2',
        productName: 'Laptop Stand',
        quantity: 1,
        price: 49.99,
        total: 49.99
      }
    ],
    subtotal: 49.99,
    tax: 5.00,
    total: 54.99,
    status: 'pending' as const,
    issueDate: '2024-01-20',
    dueDate: '2024-02-20',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
];

export const mockDashboardStats = {
  totalProducts: mockProducts.length,
  totalCustomers: mockCustomers.length,
  totalInvoices: mockInvoices.length,
  totalRevenue: mockInvoices.reduce((sum, invoice) => sum + invoice.total, 0),
  pendingInvoices: mockInvoices.filter(invoice => invoice.status === 'pending').length,
  lowStockProducts: mockProducts.filter(product => product.stock <= (product.minStock || 0)).length
};

export const mockUser = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
};
