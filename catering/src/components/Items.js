import React from "react";
import { GiCakeSlice, GiPopcorn, GiBowlOfRice } from "react-icons/gi"; // Import food-related icons
import { MdOutlineBrunchDining } from "react-icons/md"; // Breakfast icon
import { FaIceCream } from "react-icons/fa"; // Ice Cream icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Items.css"; // Import the CSS file

const Items = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="items-container1">
      <h2 className="menu-title">Browse Our Menu</h2>
      <div className="menu-grid">
        <div className="menu-item">
          <MdOutlineBrunchDining className="icon" /> {/* Breakfast Icon */}
          <h3>Breakfast</h3>
          <p>Fresh and delicious morning delights to start your day.</p>
        </div>
        <div className="menu-item">
          <GiCakeSlice className="icon" /> {/* Dessert Icon */}
          <h3>Desserts</h3>
          <p>Indulgent and sweet treats to satisfy your cravings.</p>
        </div>
        <div className="menu-item">
          <GiPopcorn className="icon" /> {/* Popcorn Icon */}
          <h3>Bites</h3>
          <p>Tasty and crispy bites perfect for any time of the day.</p>
        </div>
        <div className="menu-item">
          <GiBowlOfRice className="icon" /> {/* Rice Icon */}
          <h3>Main Dishes</h3>
          <p>Savor flavorful and satisfying meals for every occasion.</p>
        </div>
        <div className="menu-item">
          <FaIceCream className="icon" /> {/* Ice Cream Icon */}
          <h3>Frozen Delights</h3>
          <p>Creamy and delightful frozen treats for pure indulgence.</p>
        </div>
      </div>
      <button className="menu-button" onClick={() => navigate('/menu')}>
        Explore More
      </button>    
    </div>
  );
};

export default Items;
