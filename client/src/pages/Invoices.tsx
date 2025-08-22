
import React, { useState } from 'react';
import { FiPlus, FiEye, FiTrash2, FiSearch } from 'react-icons/fi';
import { mockInvoices, Invoice } from '../lib/mockData';

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteInvoice = (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(i => i.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    const badgeClass = status === 'paid' ? 'success' :
                      status === 'pending' ? 'warning' :
                      status === 'overdue' ? 'danger' : 'secondary';
    return `badge bg-${badgeClass}`;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Invoices</h1>
        <button className="btn btn-primary d-flex align-items-center">
          <FiPlus className="me-2" />
          Create Invoice
        </button>
      </div>

      {/* Search and Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <FiSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Invoice #</th>
                  <th>Customer</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      <strong>{invoice.invoiceNumber}</strong>
                    </td>
                    <td>{invoice.customerName}</td>
                    <td>{new Date(invoice.issueDate).toLocaleDateString()}</td>
                    <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td>${invoice.total.toFixed(2)}</td>
                    <td>
                      <span className={getStatusBadge(invoice.status)}>
                        {invoice.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary">
                          <FiEye size={14} />
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteInvoice(invoice.id)}
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No invoices found</p>
        </div>
      )}
    </div>
  );
}
