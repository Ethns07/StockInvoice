import { Package, BarChart3, Users, FileText, Shield, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a
            className="navbar-brand d-flex align-items-center fw-bold fs-4"
            href="/"
          >
            <Package className="me-2 text-primary" size={32} />
            InventoryPro
          </a>
          <div className="ms-auto">
            <a href="/dashboard" className="btn btn-primary rounded-pill px-4">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Text */}
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Streamline Your Business with Smart Inventory Management
              </h1>
              <p className="lead mb-4">
                Manage stock, customers, and invoices seamlessly with our modern
                business management platform. Fast, secure, and built for
                growth.
              </p>
              {/* <div className="d-flex gap-3">
                <a
                  href="/api/login"
                  className="btn btn-light btn-lg rounded-pill px-4"
                >
                  Start Free Trial
                </a>
                <button className="btn btn-outline-light btn-lg rounded-pill px-4">
                  Watch Demo
                </button>
              </div> */}
            </div>

            {/* Right Box */}
            {/* <div className="col-lg-6 mt-4 mt-lg-0">
              <div className="card bg-white text-center shadow border-0 p-5">
                <BarChart3 size={80} className="text-primary mb-3" />
                <h4 className="fw-bold">Real-time Analytics</h4>
                <p className="text-muted mb-0">
                  Monitor your business performance with live dashboards and
                  insights.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6 mb-3">
              All-in-One Business Solution
            </h2>
            <p className="lead text-muted">
              Powerful features crafted to help you grow
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: <Package size={28} />,
                title: "Inventory Management",
                desc: "Track stock levels, manage products, and get low-stock alerts.",
              },
              {
                icon: <Users size={28} />,
                title: "Customer Management",
                desc: "Maintain customer records and purchase history in one place.",
              },
              {
                icon: <FileText size={28} />,
                title: "Smart Invoicing",
                desc: "Create invoices, track payments, and manage cash flow easily.",
              },
              {
                icon: <BarChart3 size={28} />,
                title: "Analytics & Reports",
                desc: "Gain insights into sales and performance with real-time data.",
              },
              {
                icon: <Shield size={28} />,
                title: "Secure & Reliable",
                desc: "Enterprise-grade security with automatic backups included.",
              },
              {
                icon: <Zap size={28} />,
                title: "Lightning Fast",
                desc: "Enjoy instant data access with optimized system performance.",
              },
            ].map((feature, i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 text-center shadow-sm border-0 p-4">
                  <div className="text-primary mb-3">{feature.icon}</div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h3 className="display-6 fw-bold mb-3">
            Ready to Transform Your Business?
          </h3>
          <p className="lead mb-4">
            Join thousands of businesses already using InventoryPro for seamless
            operations.
          </p>
          <a
            href="/register"
            className="btn btn-light btn-lg rounded-pill px-4"
          >
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
          <p className="text-muted mb-0">
            © 2024 InventoryPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
