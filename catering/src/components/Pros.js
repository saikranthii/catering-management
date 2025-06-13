import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Pros.css";
import sampleImage from "../images/pros-image.jpg"; // Update with your actual image path
import { FaCheckCircle } from "react-icons/fa"; // Import tick mark icon

const Pros = () => {
  const navigate = useNavigate(); // Declare useNavigate inside the component

  return (
    <section className="pros-section">
      <div className="pros-container">
        {/* Left Side Image */}
        <div className="pros-image">
          <img src={sampleImage} alt="Pros Image" />
        </div>

        {/* Right Side Content */}
        <div className="pros-content">
          <h1 className="pros-heading">The Catering Pros</h1>
          <p className="pros-description">
            Delicious flavors, crafted with passion! Experience exceptional catering that turns every meal into a celebration
          </p>

          {/* Bullet Points in Two Columns */}
          <div className="pros-list-container">
            <ul className="pros-list">
              <li><FaCheckCircle className="check-icon" /> High-Quality Service</li>
              <li><FaCheckCircle className="check-icon" /> Affordable Pricing</li>
              <li><FaCheckCircle className="check-icon" /> Professional Staff</li>
            </ul>
            <ul className="pros-list">
              <li><FaCheckCircle className="check-icon" /> Customized Packages</li>
              <li><FaCheckCircle className="check-icon" /> Timely Delivery</li>
              <li><FaCheckCircle className="check-icon" /> Customer Satisfaction</li>
            </ul>
          </div>

          {/* Button */}
          <button className="pros-button" onClick={() => navigate('/contact')}>
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pros;
