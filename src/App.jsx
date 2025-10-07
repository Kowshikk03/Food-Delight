import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import FeatureCards from "./Components/FeatureCards/FeatureCards";
import Foods from "./Components/Foods/Foods";
import Footer from "./Components/Footer/Footer";
import MoreFoods from "./Components/Foods/More-Foods/More-Foods";
import Reviews from "./Components/Reviews/Reviews";
import Cart from "./Components/Cart/Cart";
import Auth from "./Components/Auth/Auth";
import Profile from "./Components/Profile/Profile";

function App() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // null if not logged in
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  const addToCart = (food) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.name === food.name);
      if (existingItem) {
        return prev.map((item) =>
          item.name === food.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...food, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const increaseQuantity = (name) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (name) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  if (loading) return <div>Loading...</div>; // optional spinner

  return (
    <div className="page-container">
      <Navbar
        cartCount={cartItems.length}
        user={user}
        setUser={setUser}
        handleLogout={handleLogout}
      />

      <main className="content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <FeatureCards />
                <Foods addToCart={addToCart} />
              </>
            }
          />
          <Route path="/more-foods" element={<MoreFoods addToCart={addToCart} />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile user={user} handleLogout={handleLogout} />} />
          <Route path="/auth" element={<Auth setUser={setUser} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
