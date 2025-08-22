import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMail, FiPhone } from 'react-icons/fi';
import { mockCustomers, Customer } from '../lib/mockData';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowModal(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const handleSaveCustomer = (customerData: Omit<Customer, 'id'>) => {
    if (editingCustomer) {
      setCustomers(customers.map(c => 
        c.id === editingCustomer.id 
          ? { ...customerData, id: editingCustomer.id }
          : c
      ));
    } else {
      const newCustomer: Customer = {
        ...customerData,
        id: Date.now().toString()
      };
      setCustomers([...customers, newCustomer]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Customers</h1>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={handleAddCustomer}
        >
          <FiPlus className="me-2" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <FiSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="row g-4">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title mb-0">{customer.name}</h5>
                  <div className="dropdown">
                    <button
                      className="btn btn-sm btn-outline-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      Actions
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEditCustomer(customer)}
                        >
                          <FiEdit2 className="me-2" size={14} />
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          <FiTrash2 className="me-2" size={14} />
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-2">
                  <small className="text-muted d-flex align-items-center">
                    <FiMail className="me-2" size={14} />
                    {customer.email}
                  </small>
                </div>

                {customer.phone && (
                  <div className="mb-2">
                    <small className="text-muted d-flex align-items-center">
                      <FiPhone className="me-2" size={14} />
                      {customer.phone}
                    </small>
                  </div>
                )}

                {customer.address && (
                  <div className="mt-3">
                    <small className="text-muted">
                      {customer.address}
                      {customer.city && `, ${customer.city}`}
                      {customer.country && `, ${customer.country}`}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No customers found</p>
        </div>
      )}

      {/* Customer Modal */}
      {showModal && (
        <CustomerModal
          customer={editingCustomer}
          onSave={handleSaveCustomer}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

interface CustomerModalProps {
  customer: Customer | null;
  onSave: (customer: Omit<Customer, 'id'>) => void;
  onCancel: () => void;
}

function CustomerModal({ customer, onSave, onCancel }: CustomerModalProps) {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
    city: customer?.city || '',
    country: customer?.country || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {customer ? 'Edit Customer' : 'Add Customer'}
            </h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {customer ? 'Update' : 'Add'} Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}