import React from "react";
import "./Articles.css";

// Import images
import paneerBiryani from "../images/paneer-biryani.jpg";
import frenchFries from "../images/french-fries.jpg";
import chickenTenders from "../images/chicken-tenders.jpg";
import doubleKaMeetha from "../images/double-ka-meetha.jpg";
import gobiManchurian from "../images/gobi-manchurian.jpg";

const articles = [
  {
    id: 1,
    title: "Winning Award for the Best Paneer Biryani – A Recipe for Perfection!",
    date: "January 3, 2023",
    description:
      "Making Paneer Biryani is about mastering the balance of fragrant spices, perfectly cooked rice, and layered flavors for a rich and aromatic delicacy.",
    image: paneerBiryani,
    featured: true, // Large Feature Article
  },
  {
    id: 2,
    title: "Best-Ever Recipe for Crispy Air-Fried French Fries",
    date: "March 03, 2025",
    image: frenchFries,
  },
  {
    id: 3,
    title: "Golden & Crunchy Chicken Tenders – A Chef’s Favorite",
    date: "October 15, 2024",
    image: chickenTenders,
  },
  {
    id: 4,
    title: "Must-Try Variations of the Classic Double Ka Meetha",
    date: "June 17, 2024",
    image: doubleKaMeetha,
  },
  {
    id: 5,
    title: "Irresistible Gobi Manchurian Delights",
    date: "December 11, 2024",
    image: gobiManchurian,
  },
];

const Articles = () => {
  return (
    <div className="articles-container">
      <h2 className="articles-title">Our Blog & Articles</h2>
      <div className="articles-grid">
        {/* Left Side - Big Featured Image */}
        <div className="featured-article">
          <div className="article-card featured">
            <img src={articles[0].image} alt={articles[0].title} className="article-image featured-image" />
            <div className="article-content">
              <p className="article-date">{articles[0].date}</p>
              <h3 className="article-title">{articles[0].title}</h3>
              <p className="article-description">{articles[0].description}</p>
            </div>
          </div>
        </div>

        {/* Right Side - 2x2 Grid for Small Images */}
        <div className="articles-list">
          {articles.slice(1).map((article) => (
            <div key={article.id} className="article-card small">
              <img src={article.image} alt={article.title} className="article-image small-image" />
              <div className="article-content">
                <p className="article-date">{article.date}</p>
                <h3 className="article-title">{article.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
