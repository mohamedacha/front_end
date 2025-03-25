import React from "react";
import "../css_files/Home.css";
import { Link } from "react-router-dom";

const SearchBar = () => {
  return (
    <div className="search-bar-home">
      <input type="text" placeholder="Search" className="search-input-home" />
      <button className="search-button-home">🔍</button>
    </div>
  );
};

const Section = ({ image, title }) => {
  return (
    <div className="section">
      <img src={image} alt={title} className="section-image" />
      <p className="section-title">{title}</p>
    </div>
  );
};

const Home = () => {
  return (
    <div className="Home_page">
      <SearchBar />
      <img src="img/home2.jpeg" alt="" />

      <p className="home_page_title" >DISCOVER OUR 
         <Link to ='/products' > PRODUCTS </Link>
        AND
        <Link to ='/services' > SERVICES </Link>
      </p>
    </div>
  );
};

export default Home;
