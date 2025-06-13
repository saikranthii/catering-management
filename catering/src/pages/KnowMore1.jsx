import React from "react";
import "./KnowMore1.css"; // Ensure CSS is correctly linked
import { FaPhoneAlt, FaEnvelope, FaLandmark } from "react-icons/fa"; // ✅ Using FaLandmark
import heroImage from "../images/KnowMore-1.png"; // ✅ Import image from src/images/

const CateringLandingPage = () => {
  return (
    <div className="catering-page">
      {/* Hero Section */}
      <section className="hero">
        <img
          src={heroImage} // ✅ Use the imported image
          alt="Delicious Catering Service"
          className="hero-image"
        />
        <div className="content">
          <h1>
            We provide <span className="highlight">healthy food</span> for your family.
          </h1>
          <p>
            Our journey began with a vision to redefine catering by blending exquisite flavors, impeccable service, 
            and elegant presentation. Inspired by the city's rich culinary heritage, we bring a perfect fusion of 
            tradition and global tastes to every event.
          </p>
          <p>
            At Elite Caterings, we believe catering is more than just food—it's about crafting unforgettable experiences. 
            Our dedicated team delivers exceptional service, exquisite flavors, and seamless execution for every event.
          </p>
        </div>
      </section>

      {/* Contact Card */}
      <section className="contact-card">
        <h3>Come and visit us</h3>
        <p><FaPhoneAlt className="icon" /> +91-96093 33222</p>
        <p><FaEnvelope className="icon" /> EliteCaterings@gmail.com</p>
        <p>
  <FaLandmark style={{ fontSize: "35px", color: "#ff7f50", marginRight: "10px" ,marginTop:"-40px",}} /> 
  83/1, Hyderabad Knowledge City, Madhapur (HITECH City), Hyderabad-500081
</p>

      </section>
    </div>
  );
};

export default CateringLandingPage;
