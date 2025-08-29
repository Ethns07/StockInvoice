import React from "react";
import {
  Package,
  Users,
  FileText,
  DollarSign,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  stock: number;
}

interface Stats {
  totalProducts: number;
  totalCustomers: number;
  totalInvoices: number;
  totalRevenue: number;
  pendingInvoices: number;
  lowStockProducts: number;
}

interface DashboardProps {
  stats: Stats;
  lowStockProducts: Product[];
}

const Dashboard: React.FC<DashboardProps> = ({ stats, lowStockProducts }) => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Overview of your business metrics and key performance indicators.
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Products */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Products
            </h3>
            <Package className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Customers
            </h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{stats.totalCustomers}</div>
        </div>

        {/* Total Invoices */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Invoices
            </h3>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{stats.totalInvoices}</div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">
            ${stats.totalRevenue.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Pending Invoices */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Pending Invoices
            </h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{stats.pendingInvoices}</div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Low Stock Products
            </h3>
            <AlertTriangle className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{stats.lowStockProducts}</div>

          {lowStockProducts.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">Items running low:</p>
              {lowStockProducts.map((product) => (
                <div key={product.id} className="text-sm">
                  <span className="font-medium">{product.name}</span>
                  <span className="text-gray-500"> - {product.stock} left</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
