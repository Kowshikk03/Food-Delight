import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Profile.css";

const Profile = ({ user, handleLogout }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setCurrentUser(storedUser);
    }
  }, [user]);

  if (!currentUser) {
    return (
      <div className="user-profile-page">
        <div className="profile-header">
          <h2 className="profile-title">Profile</h2>
          <p className="profile-subtitle">No user logged in ❌</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <div className="profile-header">
        <h2 className="profile-title">Profile</h2>
        <p className="profile-subtitle">Manage your account settings</p>
      </div>

      <div className="user-profile-card">
        <FaUserCircle className="user-profile-icon" />
        <h2 className="user-profile-name">{currentUser.name}</h2>
        <p className="user-profile-email">{currentUser.email}</p>

        <button className="user-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
