import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { ref, update } from "firebase/database";
import { database } from "../../firebase";
import "./Profile.css";

const Profile = ({ user, handleLogout }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [notification, setNotification] = useState(""); // ✅ notification state

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setEditedName(user.name || "");
      setEditedEmail(user.email || "");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setCurrentUser(storedUser);
        setEditedName(storedUser.name || "");
        setEditedEmail(storedUser.email || "");
      }
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && currentUser) {
      setEditedName(currentUser.name);
      setEditedEmail(currentUser.email);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); // hides after 3 seconds
  };

  const handleSave = async () => {
    if (!editedName || !editedEmail) {
      showNotification("Name and Email cannot be empty ❌");
      return;
    }

    try {
      await update(ref(database, `users/${currentUser.uid}`), {
        name: editedName,
        email: editedEmail,
      });

      setCurrentUser({ ...currentUser, name: editedName, email: editedEmail });
      setIsEditing(false);
      showNotification("Profile updated successfully! 🎉");
    } catch (error) {
      console.error("Failed to update profile:", error);
      showNotification("Update failed ❌");
    }
  };

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

      {notification && <div className="notification">{notification}</div>} {/* ✅ Notification */}

      <div className="user-profile-card">
        <FaUserCircle className="user-profile-icon" />

        <h2 className="user-profile-name">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            currentUser.name
          )}
        </h2>

        <p className="user-profile-email">
          {isEditing ? (
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          ) : (
            currentUser.email
          )}
        </p>

        <div className="profile-buttons">
          {isEditing ? (
            <button className="user-edit-btn" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="user-edit-btn" onClick={handleEditToggle}>
              Edit
            </button>
          )}
          <button className="user-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
