import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import {
  FaShoppingCart,
  FaUserAlt,
  FaUtensils,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartCount, user, setUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
    setMenuOpen(false);
    showNotification("You are logged out ❌", "error");
    setTimeout(() => {
      navigate("/#hero");
    }, 1500);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (user) navigate("/cart");
    else {
      showNotification("Please login to access your cart ⚠️", "error");
      setTimeout(() => navigate("/auth"), 1500);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="container">
          {/* Left Logo */}
          <div className="nav-left">
            <h1 className="logo">
              <FaUtensils className="logo-icon" /> FoodDelight
            </h1>
          </div>

          {/* Center Nav Links */}
          <nav className={`nav-center ${menuOpen ? "open" : ""}`}>
            <ul className="nav-links">
              <li>
                <Link smooth to="/#hero" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link smooth to="/more-foods" onClick={() => setMenuOpen(false)}>
                  Menu
                </Link>
              </li>
              <li>
                <Link smooth to="/cart" onClick={() => setMenuOpen(false)}>
                  Cart
                </Link>
              </li>
              <li>
                <Link smooth to="/reviews" onClick={() => setMenuOpen(false)}>
                  Reviews
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Icons + Hamburger */}
          <div className="nav-right">
            {/* Cart */}
            <div className="cart-icon" onClick={handleCartClick}>
              <FaShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>

            {/* User */}
            {user ? (
              <div className="profile-container" ref={dropdownRef}>
                <FaUserAlt
                  className="profile-icon"
                  size={20}
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div className="profile-dropdown">
                    <h4 className="dropdown-title">My Account</h4>
                    <ul className="dropdown-list">
                      <li className="dropdown-item">
                        <Link
                          to="/profile"
                          className="dropdown-link"
                          onClick={() => {
                            setShowDropdown(false);
                            setMenuOpen(false);
                          }}
                        >
                          <FaUser className="dropdown-icon" />
                          Profile
                        </Link>
                      </li>
                      <li className="dropdown-item" onClick={handleLogout}>
                        <FaSignOutAlt className="dropdown-icon" />
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="login-btn"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}

            {/* 🍔 Hamburger icon (moved after login/profile) */}
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>
      </header>

      {/* Notification popup */}
      {notification.message && (
        <div className={`notification-popup ${notification.type}`}>
          <p>{notification.message}</p>
        </div>
      )}
    </>
  );
};

export default Navbar;
