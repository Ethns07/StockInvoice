import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/products"
              element={
                <Layout>
                  <Products />
                </Layout>
              }
            />
            <Route
              path="/customers"
              element={
                <Layout>
                  <Customers />
                </Layout>
              }
            />
            <Route
              path="/invoices"
              element={
                <Layout>
                  <Invoices />
                </Layout>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
