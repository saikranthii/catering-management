import React, { useRef, useEffect, useState } from "react";
import "./Reviews.css";

import person1 from "../images/person1.jpg";
import person2 from "../images/person2.jpg";
import person3 from "../images/person3.jpg";
import person4 from "../images/person4.jpg";

const reviews = [
  {
    id: 1,
    name: "Rajesh Mehta",
    text: "Absolutely top-notch service with exquisite presentation and gourmet flavors—truly elite!",
    image: person1,
    rating: 5,
  },
  {
    id: 2,
    name: "Ananya Verma",
    text: "The professionalism and delicious food were unforgettable!",
    image: person2,
    rating: 4,
  },
  {
    id: 3,
    name: "Samuel Thomas",
    text: "Excellent service, timely delivery, and the best food quality.",
    image: person3,
    rating: 5,
  },
  {
    id: 4,
    name: "Priya Sharma",
    text: "Great experience! Highly recommended for any event.",
    image: person4,
    rating: 4,
  },
];

const Reviews = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      setTimeout(() => {
        // Smoothly scroll back to first review
        carousel.scrollLeft = 0;
      }, 500); // Delay for better transition effect
    }
  }, []);

  return (
    <section className="reviews-section">
      <h2 className="reviews-title">Our Happy Customers</h2>
      <p className="reviews-subtitle">
        Happy customers define Elite Caterings, where great taste meets exceptional service.
      </p>

      <div className="reviews-carousel" ref={carouselRef}>
        <div className="reviews-wrapper">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <img src={review.image} alt={review.name} className="review-image" />
              <div className="review-content">
                <div className="review-rating">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
                <p className="review-text">"{review.text}"</p>
                <h4 className="review-name">{review.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
