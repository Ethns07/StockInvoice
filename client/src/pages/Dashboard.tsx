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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Live overview of your business metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
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
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Invoices
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
      </div>
    </div>
  );
}
