import React from "react";
import { Link } from "react-router-dom"; 
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>
            Delicious Food <span>Delivered Fast</span>
          </h1>
          <p>
            Order from your favorite restaurants and get fresh, hot meals
            delivered right to your doorstep.
          </p>

          <Link to="/more-foods">
            <button className="hero-btn">Order Now →</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
