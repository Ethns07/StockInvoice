import React from 'react';
import { FiBox, FiUsers, FiFileText, FiDollarSign, FiAlert } from 'react-icons/fi';
import { mockProducts, mockCustomers, mockInvoices } from '../lib/mockData';

export default function Dashboard() {
  const totalProducts = mockProducts.length;
  const totalCustomers = mockCustomers.length;
  const totalInvoices = mockInvoices.length;
  const totalRevenue = mockInvoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.total, 0);
  const lowStockProducts = mockProducts.filter(p => p.stockStatus === 'low_stock' || p.stockStatus === 'out_of_stock');

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: FiBox,
      color: 'primary'
    },
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: FiUsers,
      color: 'success'
    },
    {
      title: 'Total Invoices',
      value: totalInvoices,
      icon: FiFileText,
      color: 'info'
    },
    {
      title: 'Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: FiDollarSign,
      color: 'warning'
    }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="col-md-3">
              <div className={`card border-0 shadow-sm h-100 border-start border-${stat.color}`} style={{ borderLeftWidth: '4px !important' }}>
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className={`bg-${stat.color} bg-opacity-10 rounded-circle p-3 me-3`}>
                      <Icon size={24} className={`text-${stat.color}`} />
                    </div>
                    <div>
                      <h5 className="card-title mb-0">{stat.value}</h5>
                      <p className="card-text text-muted small mb-0">{stat.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="row mb-5">
          <div className="col-12">
            <div className="alert alert-warning d-flex align-items-center" role="alert">
              <FiAlert size={20} className="me-2" />
              <div>
                <strong>Low Stock Alert:</strong> {lowStockProducts.length} product(s) are running low or out of stock.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="row">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom">
              <h5 className="card-title mb-0">Recent Invoices</h5>
            </div>
            <div className="card-body">
              {mockInvoices.length === 0 ? (
                <p className="text-muted text-center py-4">No invoices yet</p>
              ) : (
                <div className="list-group list-group-flush">
                  {mockInvoices.slice(0, 5).map((invoice) => (
                    <div key={invoice.id} className="list-group-item border-0 px-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{invoice.invoiceNumber}</h6>
                          <p className="mb-0 text-muted small">{invoice.customerName}</p>
                        </div>
                        <div className="text-end">
                          <span className="fw-bold">${invoice.total.toFixed(2)}</span>
                          <br />
                          <span className={`badge bg-${
                            invoice.status === 'paid' ? 'success' :
                            invoice.status === 'pending' ? 'warning' :
                            invoice.status === 'overdue' ? 'danger' : 'secondary'
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom">
              <h5 className="card-title mb-0">Low Stock Products</h5>
            </div>
            <div className="card-body">
              {lowStockProducts.length === 0 ? (
                <p className="text-muted text-center py-4">All products are well stocked</p>
              ) : (
                <div className="list-group list-group-flush">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="list-group-item border-0 px-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{product.name}</h6>
                          <p className="mb-0 text-muted small">{product.sku}</p>
                        </div>
                        <div className="text-end">
                          <span className="fw-bold">{product.stock}</span>
                          <br />
                          <span className={`badge bg-${
                            product.stockStatus === 'out_of_stock' ? 'danger' : 'warning'
                          }`}>
                            {product.stockStatus.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}