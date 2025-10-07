import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaUtensils } from "react-icons/fa";
import "./Footer.css";
import { HashLink as Link } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        
        <div className="footer-logo" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUtensils color="#e63946" size={32} />
            <h1 style={{ margin: 0, fontSize: "28px", color: "#333" }}>
              Food<span style={{ color: "#e63946" }}>Delight</span>
            </h1>
          </div>
          <p style={{ marginTop: "5px", color: "#555" }}>Delivering happiness, one meal at a time.</p>
        </div>

        <div className="footer-links">
          <div className="link-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link smooth to="/#hero">Home</Link></li>
              <li><Link smooth to="/more-foods">Menu</Link></li>
              <li><Link smooth to="/reviews">Reviews</Link></li>
            </ul>
          </div>

          <div className="link-column">
            <h3>Support</h3>
            <ul>
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="link-column">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <FaInstagram />
              <FaFacebookF />
              <FaTwitter />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 FoodDelight. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
