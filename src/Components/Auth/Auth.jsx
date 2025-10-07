import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, set, get, child } from "firebase/database";
import { database } from "../../firebase"; // make sure path is correct
import "./Auth.css";

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type });
    const duration = type === "success" && isLogin ? 1500 : 3000;
    setTimeout(() => setNotification({ message: "", type: "" }), duration);
  };

  const handleSignup = async () => {
    if (!name || !email || !password) {
      showNotification("Please fill all fields ❗", "error");
      return;
    }

    const userData = { name, email, password };

    try {
      await set(ref(database, `users/${email.replace(".", "_")}`), userData);
      showNotification("Signup successful! 🎉 You can now login.", "success");

      setIsLogin(true);
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      console.error(error);
      showNotification("Signup failed! ⚠️", "error");
    }
  };

  const handleLogin = async () => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${email.replace(".", "_")}`));

      if (!snapshot.exists()) {
        showNotification("No user found! Please sign up first. ⚠️", "error");
        return;
      }

      const storedUser = snapshot.val();

      if (password === storedUser.password) {
        showNotification(`Welcome back, ${storedUser.name}! 💖`, "success");

        setUser(storedUser);

        // store current logged-in user for App.jsx to fetch
        await set(ref(database, "currentUser"), storedUser);

        setTimeout(() => navigate("/#hero"), 1500);
      } else {
        showNotification("Invalid email or password ❌", "error");
      }
    } catch (error) {
      console.error(error);
      showNotification("Login failed! ⚠️", "error");
    }
  };

  return (
    <div className="auth-container">
      <div className={`form-container ${isLogin ? "login-mode" : "signup-mode"}`}>
        <div className="toggle-buttons">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>

        <div className="form-slider">
          <div className="login-form">
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
          </div>

          <div className="signup-form">
            <h2>Sign Up</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Sign Up</button>
          </div>
        </div>
      </div>

      {notification.message && (
        <div className={`notification-popup ${notification.type}`}>
          <p>{notification.message}</p>
        </div>
      )}
    </div>
  );
};

export default Auth;
