<<<<<<< HEAD
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
=======
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  Clock,
  DollarSign,
  FileText,
  Package,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import api from "../lib/api";
import { Customer, Invoice, Product } from "../types";

const fetchDashboardData = async () => {
  const [productsRes, customersRes, invoicesRes] = await Promise.all([
    api.get("/products"),
    api.get("/customers"),
    api.get("/invoices?populate=*"),
  ]);

  return {
    products: productsRes.data.data as Product[],
    customers: customersRes.data.data as Customer[],
    invoices: invoicesRes.data.data as Invoice[],
  };
};

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });

  const totalProducts = data?.products?.length ?? 0;
  const totalCustomers = data?.customers?.length ?? 0;
  const totalInvoices = data?.invoices?.length ?? 0;

  const lowStockProducts =
    data?.products?.filter((p) => p && p.quantity <= 5) ?? [];
  const pendingInvoices =
    data?.invoices?.filter((inv) => inv && inv.status === "pending") ?? [];
  const totalRevenue =
    data?.invoices?.reduce((sum, inv) => sum + (inv?.total || 0), 0) ?? 0;
>>>>>>> a51748549ddc122c2f18c454d3189fbc4fef2fde

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
<<<<<<< HEAD
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Overview of your business metrics and key performance indicators.
=======
        <h1 className="text-3xl font-bold text-primary tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Live overview of your business metrics.
>>>>>>> a51748549ddc122c2f18c454d3189fbc4fef2fde
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Products */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Products
<<<<<<< HEAD
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
=======
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">{totalProducts}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">{totalCustomers}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invoices
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">{totalInvoices}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">
                ${totalRevenue.toFixed(2)}
              </div>
            )}
          </CardContent>
        </Card>
>>>>>>> a51748549ddc122c2f18c454d3189fbc4fef2fde
      </div>

      {/* Bottom Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Pending Invoices */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Pending Invoices
<<<<<<< HEAD
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
=======
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/4" />
            ) : (
              <div className="text-2xl font-bold">{pendingInvoices.length}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Products
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/4" />
            ) : (
              <div className="text-2xl font-bold">
                {lowStockProducts.length}
              </div>
            )}

            {!isLoading && lowStockProducts.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Items running low:
                </p>
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="text-sm">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      - {product.quantity} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
>>>>>>> a51748549ddc122c2f18c454d3189fbc4fef2fde
      </div>
    </div>
  );
};

export default Dashboard;
