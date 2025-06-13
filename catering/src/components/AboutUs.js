import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleNavigation = () => {
    navigate("/knowmore"); // Navigates to KnowMore.js route
  };

  return (
    <div className="aboutus-section">
      <div className="aboutus-content">
        <h1>We provide the best food for you</h1>
        <p>
          "Elite Catering Services – Where exceptional taste meets impeccable service and quality. 
          From grand celebrations to intimate gatherings, we offer 100+ exquisite delicacies, 
          ensuring every occasion is a feast to remember!"
        </p>
        <button className="aboutus-button" onClick={handleNavigation}>Know More</button>
      </div>
    </div>
  );
};

export default AboutUs;
