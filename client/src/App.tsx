import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Landing from "./pages/Landing";
import NotFound from "./pages/not-found";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/customers" element={<Layout><Customers /></Layout>} />
        <Route path="/invoices" element={<Layout><Invoices /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;