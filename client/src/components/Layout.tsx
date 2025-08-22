import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { 
  BarChart3, 
  Package, 
  FileText, 
  Users, 
  LogOut, 
  Search,
  Bell
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: BarChart3 },
    { name: "Products", href: "/products", icon: Package },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Invoices", href: "/invoices", icon: FileText },
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="p-3 border-bottom">
          <div className="d-flex align-items-center">
            <Package className="me-2" size={24} style={{ color: "#3498db" }} />
            <span className="fw-bold fs-5">InventoryPro</span>
          </div>
        </div>

        <div className="sidebar-nav">
          <ul className="nav flex-column">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li className="nav-item" key={item.name}>
                  <Link href={item.href}>
                    <a className={`nav-link ${isActivePath(item.href) ? 'active' : ''}`}>
                      <Icon size={20} />
                      {item.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-auto p-3 border-top" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <div className="d-flex align-items-center mb-2">
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                 style={{ width: '40px', height: '40px', fontSize: '1.2rem', color: 'white' }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="fw-semibold">{user?.name || 'User'}</div>
              <small className="text-muted">Administrator</small>
            </div>
          </div>
          <button 
            onClick={logout} 
            className="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center"
          >
            <LogOut size={16} className="me-2" />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content flex-grow-1">
        {/* Top Navigation */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <div className="d-flex align-items-center">
            <h1 className="h4 mb-0 me-4">
              {navigation.find(item => isActivePath(item.href))?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <input 
                type="search" 
                className="form-control form-control-sm" 
                placeholder="Search..." 
                style={{ paddingLeft: '2.5rem', width: '250px' }}
              />
              <Search 
                className="position-absolute top-50 translate-middle-y ms-2" 
                size={16} 
                style={{ left: '0.5rem', color: '#6c757d' }}
              />
            </div>

            <button className="btn btn-outline-secondary btn-sm position-relative me-3">
              <Bell size={16} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                3
              </span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div>
          {children}
        </div>
      </main>
    </div>
  );
}