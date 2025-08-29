<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
=======
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
>>>>>>> a51748549ddc122c2f18c454d3189fbc4fef2fde
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
<<<<<<< HEAD
// import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
=======
import Landing from "./pages/Landing";
>>>>>>> a51748549ddc122c2f18c454d3189fbc4fef2fde
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
=======
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
>>>>>>> a51748549ddc122c2f18c454d3189fbc4fef2fde
    </Router>
  );
}

export default App;
