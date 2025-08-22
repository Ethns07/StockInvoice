import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  AlertTriangle, 
  DollarSign, 
  FileText, 
  Plus, 
  BarChart3, 
  TrendingUp,
  Clock
} from "lucide-react";
import ProductModal from "@/components/ProductModal";
import InvoiceModal from "@/components/InvoiceModal";

export default function Dashboard() {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: recentProducts, isLoading: productsLoading } = useQuery({
    queryKey: ["/api/products"],
    select: (data) => data?.products?.slice(0, 5) || [],
  });

  const { data: recentInvoices, isLoading: invoicesLoading } = useQuery({
    queryKey: ["/api/invoices"],
    select: (data) => data?.invoices?.slice(0, 3) || [],
  });

  const getStockStatusColor = (stockStatus: string) => {
    switch (stockStatus) {
      case "in_stock": return "bg-green-100 text-green-800";
      case "low_stock": return "bg-yellow-100 text-yellow-800";
      case "out_of_stock": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card data-testid="stat-total-products">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="total-products-count">
                  {statsLoading ? "..." : stats?.totalProducts || 0}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  12% from last month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="stat-low-stock">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-3xl font-bold text-yellow-600" data-testid="low-stock-count">
                  {statsLoading ? "..." : stats?.lowStockItems || 0}
                </p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Needs attention
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="stat-total-revenue">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="total-revenue-amount">
                  ${statsLoading ? "..." : parseFloat(stats?.totalRevenue || "0").toLocaleString()}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  8% from last month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="stat-pending-invoices">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="pending-invoices-count">
                  {statsLoading ? "..." : stats?.pendingInvoices || 0}
                </p>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  Awaiting payment
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Products */}
        <div className="xl:col-span-2">
          <Card data-testid="recent-products-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Products</CardTitle>
                <Button variant="ghost" size="sm" data-testid="view-all-products">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productsLoading ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-4 text-center text-gray-500">Loading...</td>
                      </tr>
                    ) : recentProducts?.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-4 text-center text-gray-500" data-testid="no-products">
                          No products found
                        </td>
                      </tr>
                    ) : (
                      recentProducts?.map((product: any) => (
                        <tr key={product.id} data-testid={`product-row-${product.id}`}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900" data-testid={`product-name-${product.id}`}>
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500" data-testid={`product-category-${product.id}`}>
                              {product.category}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900" data-testid={`product-sku-${product.id}`}>
                            {product.sku}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900" data-testid={`product-stock-${product.id}`}>
                            {product.stock}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900" data-testid={`product-price-${product.id}`}>
                            ${parseFloat(product.price).toFixed(2)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Badge 
                              className={getStockStatusColor(product.stockStatus)}
                              data-testid={`product-status-${product.id}`}
                            >
                              {product.stockStatus === "in_stock" ? "In Stock" : 
                               product.stockStatus === "low_stock" ? "Low Stock" : "Out of Stock"}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Invoices */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card data-testid="quick-actions-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                  onClick={() => setProductModalOpen(true)}
                  data-testid="add-product-button"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
                
                <Button 
                  className="w-full justify-start bg-green-600 hover:bg-green-700"
                  onClick={() => setInvoiceModalOpen(true)}
                  data-testid="create-invoice-button"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
                
                <Button 
                  className="w-full justify-start bg-gray-600 hover:bg-gray-700"
                  data-testid="generate-report-button"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                
                <Button 
                  className="w-full justify-start bg-yellow-600 hover:bg-yellow-700"
                  data-testid="view-low-stock-button"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  View Low Stock
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Invoices */}
          <Card data-testid="recent-invoices-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Invoices</CardTitle>
                <Button variant="ghost" size="sm" data-testid="view-all-invoices">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoicesLoading ? (
                  <div className="text-center text-gray-500">Loading...</div>
                ) : recentInvoices?.length === 0 ? (
                  <div className="text-center text-gray-500" data-testid="no-invoices">
                    No invoices found
                  </div>
                ) : (
                  recentInvoices?.map((invoice: any) => (
                    <div 
                      key={invoice.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      data-testid={`invoice-item-${invoice.id}`}
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900" data-testid={`invoice-number-${invoice.id}`}>
                          {invoice.invoiceNumber}
                        </p>
                        <p className="text-xs text-gray-500" data-testid={`invoice-customer-${invoice.id}`}>
                          {invoice.customer?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900" data-testid={`invoice-total-${invoice.id}`}>
                          ${parseFloat(invoice.total).toFixed(2)}
                        </p>
                        <Badge 
                          className={getInvoiceStatusColor(invoice.status)}
                          data-testid={`invoice-status-${invoice.id}`}
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ProductModal open={productModalOpen} onOpenChange={setProductModalOpen} />
      <InvoiceModal open={invoiceModalOpen} onOpenChange={setInvoiceModalOpen} />
    </div>
  );
}
