import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiFoodTruck } from "react-icons/gi";
import "./Navbar2.css";
import LogoImg from "../images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete your profile");
      return;
    }

    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const result = await response.json();
        if (response.ok) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          alert("Profile deleted successfully");
          navigate("/");
        } else {
          alert(result.message || "Failed to delete profile");
        }
      } catch (error) {
        console.error("Delete profile error:", error);
        if (error.name === "AbortError") {
          alert("Request timed out. Please check your network connection and try again.");
        } else if (error.message.includes("Failed to fetch")) {
          alert("Cannot connect to the backend. Please ensure the server is running on http://localhost:5000.");
        } else {
          alert(`An error occurred while deleting your profile: ${error.message}`);
        }
      }
    }
  };

  const getInitials = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      console.log("User data from localStorage:", user);
      if (user && user.email) {
        return user.email.slice(0, 2).toUpperCase();
      }
    }
    console.log("No email found in localStorage.user");
    return "??";
  };

  return (
    <nav className="navbar2">
      <div className="container">
        <Link to="/" className="logo">
          <img src={LogoImg} alt="Elite Caterings Logo" className="logo-img" />
          <div className="navbar-text">
            <span>Elite Caterings</span>
          </div>
        </Link>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className={`nav-link ${location.pathname === "/menu" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`nav-link ${location.pathname === "/services" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/knowmore"
              className={`nav-link ${location.pathname === "/knowmore" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>

          {!isLoggedIn && (
            <li>
              <Link
                to="/login"
                className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          )}

          <li className="cart-icon">
            <Link to="/cart" className="nav-link cart-link">
              <div className="cart-container">
                <GiFoodTruck className="GiFoodTruck" />
                <span className="cart-text">Cart</span>
              </div>
            </Link>
          </li>

          {isLoggedIn && (
            <li className="profile-container">
              <div className="profile-circle">
                {getInitials()}
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <p>{JSON.parse(localStorage.getItem("user") || "{}")?.email || "No email"}</p>
                    <p>Role: {JSON.parse(localStorage.getItem("user") || "{}")?.role || "N/A"}</p>
                  </div>
                  <Link to="/edit-profile" className="edit-profile-btn">
                    Edit Profile
                  </Link>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                  <button className="delete-profile-btn" onClick={handleDelete}>
                    Delete Profile
                  </button>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;