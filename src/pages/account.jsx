import React from "react";
import "../css_files/Home.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" className="search-input" />
      <button className="search-button">🔍</button>
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
    <div className="Home">
      <SearchBar />
      <div className="sections-container">
        <Section image="/services.png" title="discover our services" />
        <Section image="/products.png" title="discover our products" />
      </div>
    </div>
  );
};

export default Home;
