import './KnowMore3.css';
import React from "react";
import foodMapImage from "../images/KnowMore-3.png"; // ✅ Import the image

const CateringInfoSection = () => {
  return (
    <div className="catering-info"> {/* Unique parent class to scope styles */}
      <div className="info-section">
        {/* Text Content */}
        <div className="info-text">
          <h1>A little information for our valuable guest</h1>
          <p>
            At Elite Caterings, we go beyond just food to create unforgettable experiences. 
            Our dedicated team ensures every event is served with excellence, warmth, and exquisite flavors.
          </p>
        </div>

        {/* Content Layout */}
        <div className="info-container">
          {/* Statistics Section */}
          <div className="stats">
            <div className="stat-box">
              <h2>3</h2>
              <p>Locations</p>
            </div>
            <div className="stat-box">
              <h2>2005</h2>
              <p>Founded</p>
            </div>
            <div className="stat-box">
              <h2>65+</h2>
              <p>Staff Members</p>
            </div>
            <div className="stat-box">
              <h2>100%</h2>
              <p>Satisfied Customers</p>
            </div>
          </div>

          {/* India Food Map */}
          <div className="food-map">
            <img 
              src={foodMapImage} // ✅ Use the imported image
              alt="India Map with Food Items"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CateringInfoSection;
