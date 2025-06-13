import React from "react";
import "./Special.css";
import img1 from "../images/s1.jpg"; 
import img2 from "../images/s2.jpg";
import img3 from "../images/s3.jpg";
import img4 from "../images/s4.jpg";

const Special = () => {
  return (
    <div className="special-section">
      <h1 className="special-heading">Our Special Dishes</h1>
      <p className="special-text">"Indulge in our chef’s handpicked specialties, crafted with fresh ingredients and rich flavors. Experience a delightful fusion of taste and aroma in every bite!"</p>

      <div className="special-images">
        <div className="special-item">
          <img src={img1} alt="Dish 1" className="special-img" />
          <h3 className="image-name">Shahi Paneer Tikka</h3>
          <p className="image-desc">Soft and smoky paneer cubes marinated in rich Indian spices, grilled to perfection and served with zesty mint chutney.</p>
        </div>

        <div className="special-item">
          <img src={img2} alt="Dish 2" className="special-img" />
          <h3 className="image-name">Mushroom Truffle Risotto</h3>
          <p className="image-desc">Creamy Arborio rice slow-cooked with earthy mushrooms, infused with rich truffle oil, and topped with a sprinkle of parmesan cheese.</p>
        </div>

        <div className="special-item">
          <img src={img3} alt="Dish 3" className="special-img" />
          <h3 className="image-name">Mughlai Butter Chicken</h3>
          <p className="image-desc">Tender chicken simmered in a velvety tomato-based gravy, enriched with butter and cream, served with fluffy naan or fragrant basmati rice.</p>
        </div>

        <div className="special-item">
          <img src={img4} alt="Dish 4" className="special-img" />
          <h3 className="image-name">Grilled Lemon Herb Salmon</h3>
          <p className="image-desc">Fresh salmon fillet marinated in zesty lemon and fragrant herbs, perfectly grilled for a crispy outside and juicy inside.</p>
        </div>
      </div>
    </div>
  );
};

export default Special;
