
import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { mockProducts, Product } from '../lib/mockData';

export default function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...productData, id: editingProduct.id }
          : p
      ));
    } else {
      // Add new product
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString()
      };
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
  };

  const getStockStatusBadge = (status: string) => {
    const badgeClass = status === 'in_stock' ? 'success' : 
                      status === 'low_stock' ? 'warning' : 'danger';
    return `badge bg-${badgeClass}`;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Products</h1>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={handleAddProduct}
        >
          <FiPlus className="me-2" />
          Add Product
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div>
                        <strong>{product.name}</strong>
                        {product.description && (
                          <div className="text-muted small">{product.description}</div>
                        )}
                      </div>
                    </td>
                    <td>{product.sku}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      {product.stock}
                      <div className="text-muted small">Min: {product.minStock}</div>
                    </td>
                    <td>
                      <span className={getStockStatusBadge(product.stockStatus)}>
                        {product.stockStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleEditProduct(product)}
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteProduct(product.id)}
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No products found</p>
        </div>
      )}

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

interface ProductModalProps {
  product: Product | null;
  onSave: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

function ProductModal({ product, onSave, onCancel }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    sku: product?.sku || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    minStock: product?.minStock || 0,
    description: product?.description || '',
    category: product?.category || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const stockStatus: Product['stockStatus'] = 
      formData.stock <= 0 ? 'out_of_stock' :
      formData.stock <= formData.minStock ? 'low_stock' : 'in_stock';

    onSave({
      ...formData,
      stockStatus
    });
  };

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {product ? 'Edit Product' : 'Add Product'}
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
                <label className="form-label">SKU *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Min Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.minStock}
                      onChange={(e) => setFormData({...formData, minStock: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {product ? 'Update' : 'Add'} Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
