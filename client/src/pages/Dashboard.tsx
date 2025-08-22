import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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

  const getStockStatusClass = (stockStatus: string) => {
    switch (stockStatus) {
      case "in_stock": return "status-in-stock";
      case "low_stock": return "status-low-stock";
      case "out_of_stock": return "status-out-of-stock";
      default: return "bg-light text-dark";
    }
  };

  const getInvoiceStatusClass = (status: string) => {
    switch (status) {
      case "paid": return "status-paid";
      case "pending": return "status-pending";
      case "overdue": return "status-overdue";
      case "cancelled": return "status-cancelled";
      default: return "bg-light text-dark";
    }
  };

  if (statsLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid">
        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card inventory-card stats-card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Total Products</p>
                    <h3 className="mb-0">{stats?.totalProducts || 0}</h3>
                    <small className="text-success">
                      <TrendingUp size={14} className="me-1" />
                      +12% from last month
                    </small>
                  </div>
                  <div className="bg-primary text-white rounded p-2">
                    <Package size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card inventory-card stats-card warning h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Low Stock Items</p>
                    <h3 className="mb-0">{stats?.lowStockItems || 0}</h3>
                    <small className="text-warning">
                      <AlertTriangle size={14} className="me-1" />
                      Needs attention
                    </small>
                  </div>
                  <div className="bg-warning text-white rounded p-2">
                    <AlertTriangle size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card inventory-card stats-card success h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Total Revenue</p>
                    <h3 className="mb-0">${stats?.totalRevenue || 0}</h3>
                    <small className="text-success">
                      <TrendingUp size={14} className="me-1" />
                      +8% from last month
                    </small>
                  </div>
                  <div className="bg-success text-white rounded p-2">
                    <DollarSign size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card inventory-card stats-card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Pending Invoices</p>
                    <h3 className="mb-0">{stats?.pendingInvoices || 0}</h3>
                    <small className="text-warning">
                      <Clock size={14} className="me-1" />
                      Awaiting payment
                    </small>
                  </div>
                  <div className="bg-info text-white rounded p-2">
                    <FileText size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card inventory-card">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <BarChart3 className="me-2" />
                  Quick Actions
                </h5>
                <div className="d-flex gap-2 flex-wrap">
                  <button 
                    onClick={() => setProductModalOpen(true)}
                    className="btn btn-inventory-primary"
                  >
                    <Plus size={16} className="me-2" />
                    Add Product
                  </button>
                  <button 
                    onClick={() => setInvoiceModalOpen(true)}
                    className="btn btn-inventory-secondary"
                  >
                    <Plus size={16} className="me-2" />
                    Create Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Products and Invoices */}
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card inventory-card h-100">
              <div className="card-header bg-white border-bottom">
                <h5 className="mb-0">Recent Products</h5>
              </div>
              <div className="card-body">
                {productsLoading ? (
                  <div className="text-center">
                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>SKU</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProducts?.map((product: any) => (
                          <tr key={product.id}>
                            <td className="fw-medium">{product.name}</td>
                            <td className="text-muted">{product.sku}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                              <span className={`status-badge ${getStockStatusClass(product.stockStatus)}`}>
                                {product.stockStatus?.replace('_', ' ')}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card inventory-card h-100">
              <div className="card-header bg-white border-bottom">
                <h5 className="mb-0">Recent Invoices</h5>
              </div>
              <div className="card-body">
                {invoicesLoading ? (
                  <div className="text-center">
                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {recentInvoices?.map((invoice: any) => (
                      <div key={invoice.id} className="border rounded p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="fw-medium">#{invoice.invoiceNumber}</span>
                          <span className={`status-badge ${getInvoiceStatusClass(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        </div>
                        <div className="text-muted small mb-1">{invoice.customerName}</div>
                        <div className="fw-bold text-success">${invoice.total}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {productModalOpen && (
        <ProductModal 
          isOpen={productModalOpen} 
          onClose={() => setProductModalOpen(false)} 
        />
      )}

      {invoiceModalOpen && (
        <InvoiceModal 
          isOpen={invoiceModalOpen} 
          onClose={() => setInvoiceModalOpen(false)} 
        />
      )}
    </>
  );
}