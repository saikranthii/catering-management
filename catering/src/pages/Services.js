import React, { useEffect } from "react";
import "./Services.css";
import Navbar2 from "../components/Navbar2.js";  // ✅ Corrected path
import Footer1 from "../pages/Footer1.js";

// Import images from the local "images" folder in src
import weddingImg from "../images/wedding.jpg";
import corporateImg from "../images/corporate.jpg";
import birthdayImg from "../images/birthday.jpg";
import buffetImg from "../images/buffet.jpg";
import outdoorImg from "../images/outdoor.jpg";
import privateChefImg from "../images/private_chef.jpg";

const services = [
  {
    id: 1,
    title: "Wedding Catering",
    image: weddingImg,
    description: "Elegant and delicious menus crafted to make your wedding memorable."
  },
  {
    id: 2,
    title: "Corporate Events",
    image: corporateImg,
    description: "Professional catering for business meetings, conferences, and corporate gatherings."
  },
  {
    id: 3,
    title: "Birthday Parties",
    image: birthdayImg,
    description: "Customizable menus to add flavor to your special day."
  },
  {
    id: 4,
    title: "Buffet Service",
    image: buffetImg,
    description: "A variety of dishes served in an elegant buffet style."
  },
  {
    id: 5,
    title: "Outdoor Catering",
    image: outdoorImg,
    description: "Perfect for picnics, barbecues, and open-air events."
  },
  {
    id: 6,
    title: "Private Chef Service",
    image: privateChefImg,
    description: "A luxury dining experience with a personal chef at your service."
  }
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <>
      <Navbar2 /> {/* ✅ Navbar2 remains at the top */}

      <div className="services-container">
        <h2 className="section-title">Our Catering Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <img src={service.image} alt={service.title} className="service-image" />
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer1 /> {/* ✅ Footer1 is now added at the bottom */}
    </>
  );
};

export default Services;
