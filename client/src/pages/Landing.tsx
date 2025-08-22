
import { Package, BarChart3, Users, FileText, Shield, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <Package className="me-2 text-primary" size={32} />
            <span className="fw-bold fs-4">InventoryPro</span>
          </a>
          <div className="navbar-nav ms-auto">
            <a href="/api/login" className="btn btn-inventory-primary">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Streamline Your Business with Smart Inventory Management
              </h1>
              <p className="lead mb-4">
                Take control of your inventory, customers, and invoicing with our comprehensive 
                business management platform. Built for modern businesses who value efficiency and growth.
              </p>
              <div className="d-flex gap-3">
                <a href="/api/login" className="btn btn-light btn-lg">
                  Start Free Trial
                </a>
                <button className="btn btn-outline-light btn-lg">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <div className="bg-white bg-opacity-10 rounded p-5">
                  <BarChart3 size={120} className="text-white mb-3" />
                  <h4 className="text-white">Real-time Analytics</h4>
                  <p className="text-white-50">Monitor your business performance with live dashboards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Everything You Need to Manage Your Business</h2>
            <p className="lead text-muted">Powerful features designed to help you succeed</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <div className="feature-icon">
                  <Package size={24} />
                </div>
                <h4 className="mb-3">Inventory Management</h4>
                <p className="text-muted">
                  Track stock levels, manage products, and get alerts when inventory runs low. 
                  Never run out of stock again.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center">
                <div className="feature-icon">
                  <Users size={24} />
                </div>
                <h4 className="mb-3">Customer Management</h4>
                <p className="text-muted">
                  Build and maintain relationships with your customers. Keep track of contact 
                  information and purchase history.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center">
                <div className="feature-icon">
                  <FileText size={24} />
                </div>
                <h4 className="mb-3">Smart Invoicing</h4>
                <p className="text-muted">
                  Create professional invoices, track payments, and manage your cash flow 
                  with automated reminders.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center">
                <div className="feature-icon">
                  <BarChart3 size={24} />
                </div>
                <h4 className="mb-3">Analytics & Reports</h4>
                <p className="text-muted">
                  Get insights into your business performance with comprehensive reports 
                  and real-time analytics.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center">
                <div className="feature-icon">
                  <Shield size={24} />
                </div>
                <h4 className="mb-3">Secure & Reliable</h4>
                <p className="text-muted">
                  Your data is protected with enterprise-grade security. Regular backups 
                  ensure your information is always safe.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center">
                <div className="feature-icon">
                  <Zap size={24} />
                </div>
                <h4 className="mb-3">Lightning Fast</h4>
                <p className="text-muted">
                  Built for speed and efficiency. Access your data instantly and 
                  manage your business without any lag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h3 className="display-6 fw-bold mb-3">Ready to Transform Your Business?</h3>
          <p className="lead mb-4">
            Join thousands of businesses already using InventoryPro to streamline their operations.
          </p>
          <a href="/api/login" className="btn btn-light btn-lg">
            Start Your Journey
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light py-4">
        <div className="container text-center">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <Package className="me-2 text-primary" size={24} />
            <span className="fw-semibold fs-5">InventoryPro</span>
          </div>
          <p className="text-muted mb-0">© 2024 InventoryPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
