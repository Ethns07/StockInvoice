
import {
  Product as ProductModel,
  Customer as CustomerModel,
  Invoice as InvoiceModel,
  User as UserModel,
  IProduct,
  ICustomer,
  IInvoice,
  IUser,
  InsertProduct as InsertProductSchema,
  InsertCustomer as InsertCustomerSchema,
  InsertInvoice as InsertInvoiceSchema,
  ProductWithStock as ProductWithStockSchema,
} from '@shared/schema';
import { Types } from 'mongoose';

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<IUser | undefined>;
  upsertUser(user: Partial<IUser>): Promise<IUser>;

  // Product operations
  getProducts(page?: number, limit?: number, search?: string): Promise<{ products: ProductWithStockSchema[]; total: number }>;
  getProduct(id: string): Promise<IProduct | undefined>;
  createProduct(product: InsertProductSchema): Promise<IProduct>;
  updateProduct(id: string, product: Partial<InsertProductSchema>): Promise<IProduct | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  updateStock(productId: string, quantity: number): Promise<boolean>;
  getLowStockProducts(): Promise<ProductWithStockSchema[]>;

  // Customer operations
  getCustomers(page?: number, limit?: number, search?: string): Promise<{ customers: ICustomer[]; total: number }>;
  getCustomer(id: string): Promise<ICustomer | undefined>;
  createCustomer(customer: InsertCustomerSchema): Promise<ICustomer>;
  updateCustomer(id: string, customer: Partial<InsertCustomerSchema>): Promise<ICustomer | undefined>;
  deleteCustomer(id: string): Promise<boolean>;

  // Invoice operations
  getInvoices(page?: number, limit?: number, search?: string): Promise<{ invoices: any[]; total: number }>;
  getInvoice(id: string): Promise<any | undefined>;
  createInvoice(invoice: InsertInvoiceSchema): Promise<IInvoice>;
  updateInvoice(id: string, invoice: Partial<InsertInvoiceSchema>): Promise<IInvoice | undefined>;
  deleteInvoice(id: string): Promise<boolean>;

  // Dashboard stats
  getDashboardStats(): Promise<any>;
}

class MongoStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<IUser | undefined> {
    try {
      const user = await UserModel.findById(id);
      return user || undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async upsertUser(user: Partial<IUser>): Promise<IUser> {
    try {
      const userId = user.id || user._id;
      const existingUser = await UserModel.findById(userId);
      if (existingUser) {
        Object.assign(existingUser, user, { updatedAt: new Date() });
        await existingUser.save();
        return existingUser;
      } else {
        const newUser = new UserModel({
          _id: userId,
          ...user,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        await newUser.save();
        return newUser;
      }
    } catch (error) {
      console.error('Error upserting user:', error);
      throw error;
    }
  }

  // Product operations
  async getProducts(page = 1, limit = 10, search = ""): Promise<{ products: ProductWithStockSchema[]; total: number }> {
    try {
      const offset = (page - 1) * limit;
      const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};
      
      const [products, total] = await Promise.all([
        ProductModel.find(searchQuery)
          .sort({ createdAt: -1 })
          .skip(offset)
          .limit(limit)
          .lean(),
        ProductModel.countDocuments(searchQuery)
      ]);

      const productsWithStock = products.map(product => ({
        ...product,
        stockStatus: product.stock <= 0 ? "out_of_stock" as const :
                    product.stock <= product.minStock ? "low_stock" as const :
                    "in_stock" as const
      }));

      return { products: productsWithStock, total };
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }

  async getProduct(id: string): Promise<IProduct | undefined> {
    try {
      const product = await ProductModel.findById(id);
      return product || undefined;
    } catch (error) {
      console.error('Error getting product:', error);
      return undefined;
    }
  }

  async createProduct(product: InsertProductSchema): Promise<IProduct> {
    try {
      const newProduct = new ProductModel({
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id: string, product: Partial<InsertProductSchema>): Promise<IProduct | undefined> {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { ...product, updatedAt: new Date() },
        { new: true }
      );
      return updatedProduct || undefined;
    } catch (error) {
      console.error('Error updating product:', error);
      return undefined;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const result = await ProductModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }

  async updateStock(productId: string, quantity: number): Promise<boolean> {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) return false;
      
      product.stock += quantity;
      product.updatedAt = new Date();
      await product.save();
      return true;
    } catch (error) {
      console.error('Error updating stock:', error);
      return false;
    }
  }

  async getLowStockProducts(): Promise<ProductWithStockSchema[]> {
    try {
      const products = await ProductModel.find({
        $expr: { $lte: ["$stock", "$minStock"] }
      }).lean();

      return products.map(product => ({
        ...product,
        stockStatus: product.stock <= 0 ? "out_of_stock" as const : "low_stock" as const
      }));
    } catch (error) {
      console.error('Error getting low stock products:', error);
      return [];
    }
  }

  // Customer operations
  async getCustomers(page = 1, limit = 10, search = ""): Promise<{ customers: ICustomer[]; total: number }> {
    try {
      const offset = (page - 1) * limit;
      const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};
      
      const [customers, total] = await Promise.all([
        CustomerModel.find(searchQuery)
          .sort({ createdAt: -1 })
          .skip(offset)
          .limit(limit)
          .lean(),
        CustomerModel.countDocuments(searchQuery)
      ]);

      return { customers, total };
    } catch (error) {
      console.error('Error getting customers:', error);
      throw error;
    }
  }

  async getCustomer(id: string): Promise<ICustomer | undefined> {
    try {
      const customer = await CustomerModel.findById(id);
      return customer || undefined;
    } catch (error) {
      console.error('Error getting customer:', error);
      return undefined;
    }
  }

  async createCustomer(customer: InsertCustomerSchema): Promise<ICustomer> {
    try {
      const newCustomer = new CustomerModel({
        ...customer,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await newCustomer.save();
      return newCustomer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  async updateCustomer(id: string, customer: Partial<InsertCustomerSchema>): Promise<ICustomer | undefined> {
    try {
      const updatedCustomer = await CustomerModel.findByIdAndUpdate(
        id,
        { ...customer, updatedAt: new Date() },
        { new: true }
      );
      return updatedCustomer || undefined;
    } catch (error) {
      console.error('Error updating customer:', error);
      return undefined;
    }
  }

  async deleteCustomer(id: string): Promise<boolean> {
    try {
      const result = await CustomerModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting customer:', error);
      return false;
    }
  }

  // Invoice operations
  async getInvoices(page = 1, limit = 10, search = "", status = ""): Promise<{ invoices: any[]; total: number }> {
    try {
      const offset = (page - 1) * limit;
      let searchQuery: any = {};
      
      if (search) {
        searchQuery.invoiceNumber = { $regex: search, $options: 'i' };
      }
      
      if (status) {
        searchQuery.status = status;
      }
      
      const [invoices, total] = await Promise.all([
        InvoiceModel.find(searchQuery)
          .populate('customerId', 'name email')
          .populate('items.productId', 'name sku')
          .sort({ createdAt: -1 })
          .skip(offset)
          .limit(limit)
          .lean(),
        InvoiceModel.countDocuments(searchQuery)
      ]);

      return { invoices, total };
    } catch (error) {
      console.error('Error getting invoices:', error);
      throw error;
    }
  }

  async getInvoice(id: string): Promise<any | undefined> {
    try {
      const invoice = await InvoiceModel.findById(id)
        .populate('customerId')
        .populate('items.productId');
      return invoice || undefined;
    } catch (error) {
      console.error('Error getting invoice:', error);
      return undefined;
    }
  }

  async createInvoice(invoice: InsertInvoiceSchema, items?: any[]): Promise<IInvoice> {
    try {
      const newInvoice = new InvoiceModel({
        ...invoice,
        customerId: new Types.ObjectId(invoice.customerId),
        items: (items || invoice.items || []).map(item => ({
          ...item,
          productId: new Types.ObjectId(item.productId)
        })),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await newInvoice.save();
      return newInvoice;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  }

  async getNextInvoiceNumber(): Promise<string> {
    try {
      const lastInvoice = await InvoiceModel.findOne()
        .sort({ createdAt: -1 })
        .select('invoiceNumber');
      
      if (!lastInvoice) {
        return 'INV-0001';
      }
      
      const lastNumber = parseInt(lastInvoice.invoiceNumber.split('-')[1]) || 0;
      return `INV-${String(lastNumber + 1).padStart(4, '0')}`;
    } catch (error) {
      console.error('Error getting next invoice number:', error);
      return 'INV-0001';
    }
  }

  async updateInvoiceStatus(id: string, status: string): Promise<boolean> {
    try {
      const result = await InvoiceModel.findByIdAndUpdate(
        id,
        { status, updatedAt: new Date() },
        { new: true }
      );
      return !!result;
    } catch (error) {
      console.error('Error updating invoice status:', error);
      return false;
    }
  }

  async updateInvoice(id: string, invoice: Partial<InsertInvoiceSchema>): Promise<IInvoice | undefined> {
    try {
      const updateData = { ...invoice, updatedAt: new Date() };
      if (invoice.customerId) {
        updateData.customerId = new Types.ObjectId(invoice.customerId);
      }
      if (invoice.items) {
        updateData.items = invoice.items.map(item => ({
          ...item,
          productId: new Types.ObjectId(item.productId)
        }));
      }

      const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      return updatedInvoice || undefined;
    } catch (error) {
      console.error('Error updating invoice:', error);
      return undefined;
    }
  }

  async deleteInvoice(id: string): Promise<boolean> {
    try {
      const result = await InvoiceModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting invoice:', error);
      return false;
    }
  }

  async getDashboardStats(): Promise<any> {
    try {
      const [
        totalProducts,
        totalCustomers,
        totalInvoices,
        totalRevenue,
        lowStockCount
      ] = await Promise.all([
        ProductModel.countDocuments(),
        CustomerModel.countDocuments(),
        InvoiceModel.countDocuments(),
        InvoiceModel.aggregate([
          { $match: { status: 'paid' } },
          { $group: { _id: null, total: { $sum: '$total' } } }
        ]),
        ProductModel.countDocuments({
          $expr: { $lte: ["$stock", "$minStock"] }
        })
      ]);

      return {
        totalProducts,
        totalCustomers,
        totalInvoices,
        totalRevenue: totalRevenue[0]?.total || 0,
        lowStockCount
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      throw error;
    }
  }
}

export const storage = new MongoStorage();
