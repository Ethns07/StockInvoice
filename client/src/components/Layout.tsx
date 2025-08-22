import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Package, 
  Warehouse, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Search,
  Bell
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/", icon: BarChart3 },
    { name: "Products", href: "/products", icon: Package },
    { name: "Inventory", href: "/products", icon: Warehouse },
    { name: "Invoices", href: "/invoices", icon: FileText },
    { name: "Customers", href: "/customers", icon: Users },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200 fixed left-0 top-0 h-full z-10">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900" data-testid="app-title">InventoryPro</h1>
          <p className="text-sm text-gray-500 mt-1">Management System</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "text-white bg-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
          
          <div className="px-3 mt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</h3>
            <Link 
              href="/settings" 
              className="flex items-center px-3 py-2 mt-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              data-testid="nav-settings"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
            <a 
              href="/api/logout" 
              className="flex items-center px-3 py-2 mt-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              data-testid="nav-logout"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900" data-testid="page-title">
                {navigation.find(nav => isActive(nav.href))?.name || "Dashboard"}
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-800" data-testid="status-badge">
                Live
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products, invoices..."
                  className="w-80 pl-10"
                  data-testid="search-input"
                />
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="relative" data-testid="notifications-button">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8" data-testid="user-avatar">
                    <AvatarImage src={user?.profileImageUrl || undefined} />
                    <AvatarFallback>
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900" data-testid="user-name">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-gray-500" data-testid="user-role">Administrator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
