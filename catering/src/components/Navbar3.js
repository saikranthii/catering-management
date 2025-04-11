import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar3.css";
import LogoImg from "../images/logo.png"; // Main logo on the left

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const location = useLocation(); // Get the current page's path
  const navigate = useNavigate(); // For redirecting on logout

  // Check login state on mount and after path changes
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // If user exists in localStorage, user is logged in
  }, [location]);

  const handleLogout = () => {
    // Clear user data from localStorage and log out
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Clear token if used
    setIsLoggedIn(false); // Update login state
    navigate("/"); // Redirect to home
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
    <nav className="navbar3">
      <div className="container">
        <Link to="/" className="logo">
          <img src={LogoImg} alt="Elite Caterings Logo" className="logo-img" />
          <div className="navbar-text">
            <span>Elite Caterings</span>
          </div>
        </Link>

          
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
     
      </div>
    </nav>
  );
};

export default Navbar;