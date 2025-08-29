import React from "react";

const HomePage = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="/">
            InventoPro
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              <li className="nav-item ms-2">
                <a className="btn btn-primary" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container text-center text-md-start d-md-flex align-items-center">
          <div className="col-md-6">
            <h1 className="display-4 fw-bold text-dark">
              Smarter Inventory <span className="text-primary">Management</span>
            </h1>
            <p className="lead text-muted mt-3">
              Track stock, analyze sales, and simplify operations—all in one
              powerful platform.
            </p>
            <div className="mt-4">
              <a href="/register" className="btn btn-primary btn-lg me-3">
                Start Free Trial
              </a>
              <a href="/dashboard" className="btn btn-outline-primary btn-lg">
                Login
              </a>
            </div>
          </div>
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3208/3208676.png"
              alt="Inventory"
              className="img-fluid"
              style={{ maxHeight: "350px" }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Key Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="fw-bold">📦 Real-Time Tracking</h5>
                  <p className="text-muted">
                    Monitor stock levels, purchases, and sales instantly across
                    devices.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="fw-bold">📊 Advanced Analytics</h5>
                  <p className="text-muted">
                    Gain insights with sales trends, demand forecasting, and
                    profit reports.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="fw-bold">🔒 Secure Cloud Access</h5>
                  <p className="text-muted">
                    Access anywhere with enterprise-grade security and role
                    management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics / Social Proof */}
      <section className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h2 className="fw-bold">Trusted by Businesses Worldwide</h2>
          <div className="row mt-4">
            <div className="col-md-3">
              <h3 className="fw-bold">10K+</h3>
              <p>Active Users</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold">50M+</h3>
              <p>Items Tracked</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold">120+</h3>
              <p>Countries</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold">99.9%</h3>
              <p>Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="fw-bold text-dark">
            Ready to Take Control of Your Inventory?
          </h2>
          <p className="lead text-muted mt-2">
            Get started today with a free trial—no credit card required.
          </p>
          <a href="/register" className="btn btn-primary btn-lg mt-3">
            Start Free Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-1">&copy; 2025 InventoPro. All rights reserved.</p>
          <div>
            <a
              href="#features"
              className="text-white text-decoration-none me-3"
            >
              Features
            </a>
            <a href="#about" className="text-white text-decoration-none me-3">
              About
            </a>
            <a href="#contact" className="text-white text-decoration-none">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
