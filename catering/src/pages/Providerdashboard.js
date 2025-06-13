import React, { useState } from "react";
import Navbar3 from "../components/Navbar3.js";
import Provider from "./Provider";
import Dashboard from "./Dashboard";
import Order from "./Order";
import Message from "./Message";
import "./ProviderDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart, // Icon for Orders
  faUtensils,     // Icon for Bite Bank
  faChartLine   ,// Icon for Dashboard
  faBell          // Icon for Notifications
} from "@fortawesome/free-solid-svg-icons";

const ProviderDashboard = () => {
  const [activeSection, setActiveSection] = useState("orders");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return <Order />;
      case "provider":
        return <Provider />;
      case "dashboard":
        return <Dashboard />;
      case "messages":
        return <Message />;
      default:
        return <Order />;
    }
  };

  return (
    <div className="provider-dashboard">
      <Navbar3 />
      <div className="provider-dashboard__main">
        <aside className="provider-dashboard__sidebar">
          <div className="provider-dashboard__sidebar-header">
            <h2>Welcome Admin!</h2>
          </div>
          <ul className="provider-dashboard__menu">
            <li
              className={`provider-dashboard__menu-item ${
                activeSection === "orders" ? "active" : ""
              }`}
              onClick={() => handleSectionChange("orders")}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="menu-icon" />
              Orders
            </li>
            <li
              className={`provider-dashboard__menu-item ${
                activeSection === "provider" ? "active" : ""
              }`}
              onClick={() => handleSectionChange("provider")}
            >
              <FontAwesomeIcon icon={faUtensils} className="menu-icon" />
              Bite Bank
            </li>
            <li
              className={`provider-dashboard__menu-item ${
                activeSection === "dashboard" ? "active" : ""
              }`}
              onClick={() => handleSectionChange("dashboard")}
            >
              <FontAwesomeIcon icon={faChartLine   } className="menu-icon" />
              Dashboard
            </li>
            <li
              className={`provider-dashboard__menu-item ${
                activeSection === "messages" ? "active" : ""
              }`}
              onClick={() => handleSectionChange("messages")}
            >
              <FontAwesomeIcon icon={faBell} className="menu-icon" />
              Notifications
            </li>
          </ul>
        </aside>
        <main className="provider-dashboard__content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default ProviderDashboard;



