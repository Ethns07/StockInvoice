import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiBox, 
  FiUsers, 
  FiFileText 
} from 'react-icons/fi';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/products', label: 'Products', icon: FiBox },
    { path: '/customers', label: 'Customers', icon: FiUsers },
    { path: '/invoices', label: 'Invoices', icon: FiFileText },
  ];

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <nav className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
        <div className="p-3">
          <h4 className="text-white mb-4">InventoryPro</h4>
          <ul className="nav flex-column">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li className="nav-item mb-2" key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link d-flex align-items-center px-3 py-2 rounded text-decoration-none ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : 'text-light'
                    }`}
                    style={{ 
                      transition: 'all 0.2s',
                      backgroundColor: isActive ? '#0d6efd' : 'transparent'
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
      </nav>

      {/* Main content */}
      <main className="flex-grow-1 bg-light">
        <div className="container-fluid p-4">
          {children}
        </div>
      </main>
    </div>
  );
}