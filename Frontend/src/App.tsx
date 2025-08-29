import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Costumers";
import Invoices from "./pages/Invoices";
import PageNotFound from "./pages/PageNotFound";
import DashboardContent from "./pages/DashboardContent";
// import { Children } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard><DashboardContent /></Dashboard>} />
        <Route path="/products" element={<Dashboard><Products /></Dashboard>} />
        <Route path="/customers" element={<Dashboard><Customers /></Dashboard>} />
        <Route path="/invoices" element={<Dashboard><Invoices /></Dashboard>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
