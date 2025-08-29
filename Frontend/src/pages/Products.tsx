import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Modal, 
  InputGroup,
  Badge,
  Dropdown
} from 'react-bootstrap';
import { 
  Search, 
  Plus, 
  Filter, 
  Box, 
  CurrencyDollar, 
  Star, 
  StarFill,
  ThreeDotsVertical,
  Cpu,
  // Smartphone,
  Headphones,
  Laptop,
  Watch
} from 'react-bootstrap-icons';

// Mock Electronics products data
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    category: 'Audio',
    price: 129.99,
    stock: 45,
    sku: 'AUD-001',
    rating: 4.5,
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'iPhone 14 Pro',
    category: 'Smartphones',
    price: 999.99,
    stock: 12,
    sku: 'PHN-002',
    rating: 4.8,
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'MacBook Pro 16"',
    category: 'Laptops',
    price: 2399.99,
    stock: 8,
    sku: 'LAP-003',
    rating: 4.9,
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop'
  },
  {
    id: 4,
    name: 'Smart Watch Series 8',
    category: 'Wearables',
    price: 399.99,
    stock: 23,
    sku: 'WRB-004',
    rating: 4.6,
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop'
  },
  {
    id: 5,
    name: 'Gaming Mechanical Keyboard',
    category: 'Accessories',
    price: 89.99,
    stock: 67,
    sku: 'ACC-005',
    rating: 4.3,
    brand: 'Razer',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop'
  },
  {
    id: 6,
    name: '4K Ultra HD Monitor',
    category: 'Displays',
    price: 499.99,
    stock: 15,
    sku: 'DSP-006',
    rating: 4.7,
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=200&fit=crop'
  },
  {
    id: 7,
    name: 'Wireless Earbuds Pro',
    category: 'Audio',
    price: 199.99,
    stock: 34,
    sku: 'AUD-007',
    rating: 4.4,
    brand: 'Bose',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=200&fit=crop'
  },
  {
    id: 8,
    name: 'Graphics Card RTX 4080',
    category: 'Components',
    price: 1199.99,
    stock: 5,
    sku: 'COM-008',
    rating: 4.8,
    brand: 'NVIDIA',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop'
  }
];

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [products] = useState(mockProducts);

  const categories = ['All', 'Audio', 'Smartphones', 'Laptops', 'Wearables', 'Accessories', 'Displays', 'Components'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Audio': return <Headphones size={16} className="me-1" />;
      // case 'Smartphones': return <Smartphone size={16} className="me-1" />;
      case 'Laptops': return <Laptop size={16} className="me-1" />;
      case 'Wearables': return <Watch size={16} className="me-1" />;
      case 'Components': return <Cpu size={16} className="me-1" />;
      default: return <Box size={16} className="me-1" />;
    }
  };

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'stock': return a.stock - b.stock;
        case 'rating': return b.rating - a.rating;
        case 'brand': return a.brand.localeCompare(b.brand);
        default: return a.name.localeCompare(b.name);
      }
    });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle product creation logic here
    setShowModal(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => 
      index < Math.floor(rating) ? (
        <StarFill key={index} className="text-warning" size={12} />
      ) : (
        <Star key={index} className="text-warning" size={12} />
      )
    );
  };

  return (
    <Container fluid>
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-2">Electronics Inventory</h2>
          <p className="text-muted">Manage your electronics products and inventory</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant="primary" 
            className="rounded-pill px-4"
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} className="me-2" />
            Add Product
          </Button>
        </Col>
      </Row>

      {/* Search and Filter Section */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <Search className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search electronics by name, brand, or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-start-0"
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className="w-100">
              <Filter size={16} className="me-2" />
              {selectedCategory === 'All' ? 'All Categories' : selectedCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map(category => (
                <Dropdown.Item
                  key={category}
                  active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {getCategoryIcon(category)}
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={3}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="brand">Sort by Brand</option>
            <option value="price">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
            <option value="rating">Sort by Rating</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Products Grid */}
      <Row>
        {filteredProducts.map(product => (
          <Col key={product.id} xl={3} lg={4} md={6} className="mb-4">
            <Card className="h-100 shadow-sm border-0 hover-shadow transition-all">
              <Card.Body className="p-0">
                <div className="position-relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid rounded-top w-100"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Badge 
                    bg="dark" 
                    className="position-absolute top-0 end-0 m-2 px-2 py-1"
                  >
                    {product.brand}
                  </Badge>
                </div>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="fw-bold text-dark mb-1">{product.name}</h6>
                      <Badge bg="light" text="dark" className="fs-3">
                        {getCategoryIcon(product.category)}
                        {product.category}
                      </Badge>
                    </div>
                    <Button variant="light" size="sm" className="rounded-circle">
                      <ThreeDotsVertical size={16} />
                    </Button>
                  </div>
                  
                  <div className="mb-2">
                    <div className="d-flex align-items-center mb-1">
                      <CurrencyDollar size={14} className="text-success me-1" />
                      <span className="fw-bold text-dark">${product.price}</span>
                    </div>
                    <small className="text-muted">SKU: {product.sku}</small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center mb-1">
                        {renderStars(product.rating)}
                        <span className="text-muted ms-2 fs-3">{product.rating}</span>
                      </div>
                      <span className={`badge ${product.stock > 10 ? 'bg-success' : product.stock > 5 ? 'bg-warning' : 'bg-danger'}`}>
                        {product.stock} in stock
                      </span>
                    </div>
                    <Button variant="outline-primary" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Electronics Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddProduct}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter product name" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control type="text" placeholder="Enter brand name" required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select required>
                    <option value="">Select category</option>
                    {categories.filter(cat => cat !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>SKU Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter SKU code" required />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="0.00" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control type="number" placeholder="0" required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Product Image URL</Form.Label>
              <Form.Control type="url" placeholder="https://example.com/image.jpg" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Specifications</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Enter technical specifications..." />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Product description..." />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Electronics Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Products;