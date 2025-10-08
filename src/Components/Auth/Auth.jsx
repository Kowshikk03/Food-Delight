import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { database } from "../../firebase"; // make sure path is correct
import "./Auth.css";

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const auth = getAuth();

  const showNotification = (message, type) => {
    setNotification({ message, type });
    const duration = type === "success" && isLogin ? 1500 : 3000;
    setTimeout(() => setNotification({ message: "", type: "" }), duration);
  };

  // Signup
  const handleSignup = async () => {
    if (!name || !email || !password) {
      showNotification("Please fill all fields ❗", "error");
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save extra info in Realtime DB
      await set(ref(database, `users/${user.uid}`), {
        name,
        email,
      });

      showNotification("Signup successful! 🎉 You can now login.", "success");

      setIsLogin(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      showNotification(error.message || "Signup failed! ⚠️", "error");
    }
  };

  // Login
  const handleLogin = async () => {
    if (!email || !password) {
      showNotification("Please enter email and password ❗", "error");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user's extra info (name) from Realtime DB
      const snapshot = await get(ref(database, `users/${user.uid}`));
      const userData = snapshot.exists() ? snapshot.val() : { name: "", email: user.email };

      // Set full user info in React state
      setUser({ uid: user.uid, email: user.email, name: userData.name });

      showNotification(`Welcome back, ${userData.name || "User"}! 💖`, "success");
      setTimeout(() => navigate("/#hero"), 1500);
    } catch (error) {
      console.error(error);
      showNotification("Invalid email or password ❌", "error");
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
          {/* Login Form */}
          <div className="login-form">
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
          </div>

          {/* Signup Form */}
          <div className="signup-form">
            <h2>Sign Up</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Sign Up</button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification.message && (
        <div className={`notification-popup ${notification.type}`}>
          <p>{notification.message}</p>
        </div>
      )}
    </div>
  );
};

export default Auth;
