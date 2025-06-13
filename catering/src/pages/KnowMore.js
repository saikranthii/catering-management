import React, { useEffect } from "react";
import KnowMore1 from "./KnowMore1";
import KnowMore2 from "./KnowMore2";
import KnowMore3 from "./KnowMore3";
import Navbar2 from "../components/Navbar2";
import Footer1 from "../pages/Footer1.js";

const KnowMore = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <div>
      <Navbar2 />
      <KnowMore1 />  
      <KnowMore2 />
      <KnowMore3 />
      <Footer1 /> 
    </div>
  );
};

export default KnowMore;