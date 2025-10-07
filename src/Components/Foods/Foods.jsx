import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Foods.css";
import Food_1 from "../../assets/images/food-1.webp";
import Food_2 from "../../assets/images/food-2.png";
import Food_3 from "../../assets/images/food-3.png";
import Food_4 from "../../assets/images/food-4.png";

const foodsData = [
  {
    id: 1,
    name: "Classic Burger",
    type: "Non-Veg",
    category: "Burger",
    price: 99,
    img: Food_1,
    desc: "Juicy beef patty with fresh veggies and cheese.",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    type: "Veg",
    category: "Pizza",
    price: 199,
    img: Food_2,
    desc: "Classic pizza with fresh tomatoes, basil & mozzarella.",
  },
  {
    id: 3,
    name: "Carbonara Pasta",
    type: "Non-Veg",
    category: "Pasta",
    price: 149,
    img: Food_3,
    desc: "Creamy pasta with bacon and parmesan cheese.",
  },
  {
    id: 4,
    name: "Garden Salad",
    type: "Veg",
    category: "Salad",
    price: 80,
    img: Food_4,
    desc: "Fresh garden veggies with light dressing.",
  },
];

function Foods() {
  return (
    <div className="foods-container">
      <h2>Featured Dishes</h2>
      <p>Discover our most popular and delicious items</p>

      <div className="foods-grid">
        {foodsData.map((food) => (
          <div key={food.id} className="food-card">
            <span className={`tag ${food.type === "Veg" ? "veg" : "non-veg"}`}>
              {food.type}
            </span>
            <img src={food.img} alt={food.name} />
            <div className="food-card-content">
              <h3>{food.name}</h3>
              <p>{food.desc}</p>
              <p className="price">₹{food.price.toFixed(2)}</p>

              <Link to="/more-foods">
                <button>
                  <FaShoppingCart /> Order Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="full-menu-btn-container">
        <Link to="/more-foods">
          <button className="full-menu-btn">View Full Menu</button>
        </Link>
      </div>
    </div>
  );
}

export default Foods;
