import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import AboutUs from '../components/AboutUs.js';
import Special from '../components/Special.js';
import Pros from '../components/Pros.js';
import Items from '../components/Items.js';
import Articles from '../components/Articles.js';
import Reviews from '../components/Reviews.js';
import Footer from '../components/Footer.js';

// import Flag_Logo from '../Images/Army_Logo.png';


import './HomePage.css';

const HomePage = () => {

    return (
        <div className="homepage-container">
            {/* Header Section */}
            <header className="homepage-header">
                
            </header>
            <Navbar />
            <AboutUs />
            <Special />
            <Pros />
            <Items />
            <Articles />
            <Reviews />
            <Footer />

        </div>
    );
};

export default HomePage;
