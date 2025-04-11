import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiFoodTruck } from "react-icons/gi";
import "./Navbar.css";
import LogoImg from "../images/logo.png";
import TopRightImg from "../images/tr.png";
import TopRightImg1 from "../images/tr1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  // Check login state on mount and after path changes
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Update login state based on localStorage
  }, [currentPath]); // Runs when path changes

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    localStorage.removeItem("token"); // Clear token if used
    setIsLoggedIn(false); // Immediately update state
    setIsOpen(false); // Close the menu if open
  };

  // Get first two letters of the user's email
  const getInitials = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      console.log("User data from localStorage:", user); // Debug log
      if (user && user.email) {
        return user.email.slice(0, 2).toUpperCase();
      }
    }
    console.log("No email found in localStorage.user"); // Debug log
    return "??";
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img src={LogoImg} alt="Elite Caterings Logo" className="logo-img" />
          <div className="navbar-text">
            <span>Elite Caterings</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link
              to="/"
              className={`nav-link ${currentPath === "/" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className={`nav-link ${currentPath === "/menu" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`nav-link ${currentPath === "/services" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/knowmore"
              className={`nav-link ${currentPath === "/knowmore" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>

          {!isLoggedIn && (
            <li>
              <Link
                to="/login"
                className={`nav-link ${currentPath === "/login" ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          )}

          {/* Cart Icon */}
          <li className="cart-icon1">
            <Link to="/cart" className="nav-link cart-link">
              <div className="cart-container1">
                <GiFoodTruck className="GiFoodTruck" />
                <span className="cart-text1">Cart</span>
              </div>
            </Link>
          </li>

          {/* Profile Button (only when logged in) */}
          {isLoggedIn && (
            <li className="profile-container">
              <div className="profile-circle">
                {getInitials()}
                <div className="profile-dropdown">
                  <div className="profile-info">
                    {/* <h4>{JSON.parse(localStorage.getItem("user") || "{}")?.name || "N/A"}</h4> */}
                    <p>{JSON.parse(localStorage.getItem("user") || "{}")?.email || "No email"}</p>
                    <p>Role: {JSON.parse(localStorage.getItem("user") || "{}")?.role || "N/A"}</p>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </li>
          )}
        </ul>

        <img src={TopRightImg} alt="Top Right Image" className="top-right-img" />
        <img src={TopRightImg1} alt="Top Right Image" className="top-right-img1" />
      </div>
    </nav>
  );
};

export default Navbar;