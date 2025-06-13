import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa"; // Social media icons
import "./Footer.css"; // Import CSS file
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Logo & Opening Hours */}
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo} alt="Elite Caterings Logo" className="footer-logo-img" />
            <div className="footer-text">
              <span>Elite Caterings</span>
            </div>
            <p>
              Elite Caterings delivers exceptional flavors and impeccable service,
              ensuring every event is a memorable culinary experience. Learn more!
            </p>
          </div>

          {/* Opening Hours */}
          <div className="footer-hours">
            <h3>Opening Hours</h3>
            <div>
              <p>Monday - Friday</p>
              <p className="time">10:00 am to 9:00 pm</p>
            </div>
            <div>
              <p>Saturday - Sunday</p>
              <p className="time">11:00 am to 10:00 pm</p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h3 className="follow-us">FOLLOW US</h3>
          <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
  <FaTwitter />
</a>
<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
  <FaFacebookF />
</a>
<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
  <FaInstagram />
</a>
<a href="https://github.com" target="_blank" rel="noopener noreferrer">
  <FaGithub />
</a>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © 2025 Elite Caterings. All Rights Reserved. Designed by{" "}
            <span className="designer">BATCH 18</span>
          </p>
          <div className="footer-links">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
