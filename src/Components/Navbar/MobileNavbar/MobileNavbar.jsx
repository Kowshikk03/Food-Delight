import React from "react";
import "./MobileNavbar.css";
import { HashLink as Link } from "react-router-hash-link";
import {
  FaShoppingCart,
  FaUserAlt,
  FaUser,
  FaSignOutAlt,
  FaUtensils
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MobileNavbar = ({ isOpen, toggleMenu, user, setUser, cartCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    toggleMenu();
    setTimeout(() => navigate("/#hero"), 500);
  };

  const handleCartClick = () => {
    toggleMenu();
    if (user) navigate("/cart");
    else navigate("/auth");
  };

  return (
    <div
      className={`mobile-menu ${isOpen ? "active" : ""}`}
      onClick={toggleMenu}
    >
      <div
        className="mobile-menu-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mobile-logo">
          <FaUtensils className="mobile-logo-icon" /> FoodDelight
        </h1>

        <ul className="mobile-links">
          <li>
            <Link smooth to="/#hero" className="menu-item" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link smooth to="/more-foods" className="menu-item" onClick={toggleMenu}>
              Menu
            </Link>
          </li>
          <li>
            <button className="menu-item" onClick={handleCartClick}>
              <FaShoppingCart /> Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </li>
          <li>
            <Link smooth to="/reviews" className="menu-item" onClick={toggleMenu}>
              Reviews
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/profile" className="menu-item" onClick={toggleMenu}>
                  <FaUser /> Profile
                </Link>
              </li>
              <li>
                <button className="menu-item logout-btn" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/auth" className="menu-item login-btn" onClick={toggleMenu}>
                <FaUserAlt /> Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
