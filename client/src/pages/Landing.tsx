import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Package, FileText, Users, Shield, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900" data-testid="app-title">InventoryPro</h1>
          </div>
          <Button asChild data-testid="login-button">
            <a href="/api/login">Sign In</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6" data-testid="hero-title">
            Streamline Your Inventory Management
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-testid="hero-description">
            Complete inventory management solution with powerful invoicing features. 
            Track products, manage stock levels, create professional invoices, and generate insightful reports.
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-3" data-testid="get-started-button">
            <a href="/api/login">Get Started Today</a>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4" data-testid="features-title">
            Everything You Need to Manage Your Business
          </h3>
          <p className="text-lg text-gray-600" data-testid="features-description">
            Powerful features designed to grow with your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid="feature-inventory">
            <CardHeader>
              <Package className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Product Management</CardTitle>
              <CardDescription>
                Organize and track your products with detailed information, categories, and stock levels.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid="feature-invoicing">
            <CardHeader>
              <FileText className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Smart Invoicing</CardTitle>
              <CardDescription>
                Create professional invoices with automatic calculations and PDF generation capabilities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid="feature-customers">
            <CardHeader>
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>
                Maintain comprehensive customer records and track their purchase history.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid="feature-analytics">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-yellow-600 mb-4" />
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                Gain insights into your business with detailed reports and analytics dashboards.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid="feature-realtime">
            <CardHeader>
              <Zap className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Real-time Updates</CardTitle>
              <CardDescription>
                Stay informed with real-time stock level updates and low inventory alerts.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid="feature-security">
            <CardHeader>
              <Shield className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Your data is protected with enterprise-grade security and reliable backups.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4" data-testid="cta-title">
            Ready to Transform Your Business?
          </h3>
          <p className="text-xl mb-8 opacity-90" data-testid="cta-description">
            Join thousands of businesses already using InventoryPro to streamline their operations.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3" data-testid="cta-button">
            <a href="/api/login">Start Your Journey</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Package className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900" data-testid="footer-title">InventoryPro</span>
          </div>
          <p className="text-gray-600" data-testid="footer-text">
            © 2024 InventoryPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
