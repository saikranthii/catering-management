import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Page Imports
import HomePage from "./pages/HomePage";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Provider from "./pages/Provider";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import KnowMore from "./pages/KnowMore";
import ProviderDashboard from "./pages/Providerdashboard";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Order from "./pages/Order";
import Message from "./pages/Message";

// Component Imports
import EditProfile from "./components/EditProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/provider" element={<Provider />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/knowmore" element={<KnowMore />} />
        <Route path="/providerdashboard" element={<ProviderDashboard />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/order" element={<Order />} />
        <Route path="/message" element={<Message />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
