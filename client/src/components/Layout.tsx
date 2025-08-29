import React from "react";
import { FiBox, FiFileText, FiHome, FiLogOut, FiUsers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { logout, user } = useAuth();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: FiHome },
    { path: "/products", label: "Products", icon: FiBox },
    { path: "/customers", label: "Customers", icon: FiUsers },
    { path: "/invoices", label: "Invoices", icon: FiFileText },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav
        className="bg-white text-dark flex flex-column"
        style={{
          width: "250px",
          minHeight: "100vh",
          boxShadow: "0 0 15px rgba(0,0,0,0.05)",
        }}
      >
        <div className="p-3 flex-grow-1">
          <h4 className="text-black mb-4 font-bold text-center">
            InventoryPro
          </h4>
          <ul className="nav flex-column">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li className="nav-item mb-2" key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link d-flex align-items-center px-3 py-2 rounded text-decoration-none ${
                      isActive ? "text-white" : "text-secondary"
                    }`}
                    style={{
                      transition: "all 0.2s",
                      backgroundColor: isActive ? "#0d6efd" : "transparent",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <Icon className="me-2" size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="p-3">
          <div className="text-center mb-3">
            <small className="text-muted">{user?.email}</small>
          </div>
          <button
            onClick={logout}
            className={`w-100 btn btn-outline-danger d-flex align-items-center justify-content-center px-3 py-2 rounded`}
          >
            <FiLogOut className="me-2" size={18} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow-1 bg-light">
        <div className="container-fluid p-4">{children}</div>
      </main>
    </div>
  );
}
