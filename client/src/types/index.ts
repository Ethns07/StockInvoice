export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  total: number;
  invoiceStatus: "pending" | "paid" | "overdue" | "cancelled";
  issueDate: string;
  items: any[];
  customer: {
    id: number;
    name: string;
  };
}
