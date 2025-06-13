import React from "react";
import "./KnowMore2.css"; // Linking the CSS file
import { FaUtensils, FaShoppingCart, FaTruck } from "react-icons/fa"; // Import FA icons
import heroImage from "../images/KnowMore-2.jpg"; // ✅ Import background image

const KnowMore2 = () => {
  return (
    <div className="knowmore2-page"> {/* Scoped class for isolation */}
      {/* Hero Section */}
      <section className="knowmore2-hero">
        <div className="knowmore2-overlay">
          <h1>Feel the authentic & <br /> original taste from us</h1>
        </div>
      </section>

      {/* Features Section */}
      <section className="knowmore2-features">
        <div className="knowmore2-feature">
          <FaUtensils className="knowmore2-icon" />
          <h3>Multi Cuisine</h3>
          <p>In the new era of technology, we look to the future with certainty.</p>
        </div>
        <div className="knowmore2-feature">
          <FaShoppingCart className="knowmore2-icon" />
          <h3>Easy To Order</h3>
          <p>In the new era of technology, we look to the future with certainty.</p>
        </div>
        <div className="knowmore2-feature">
          <FaTruck className="knowmore2-icon" />
          <h3>Fast Delivery</h3>
          <p>In the new era of technology, we look to the future with certainty.</p>
        </div>
      </section>
    </div>
  );
};

export default KnowMore2;
