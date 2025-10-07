import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaSearch, FaChevronDown } from "react-icons/fa";
import "./More-Foods.css";
import Food_1 from "../../../assets/Images/food-1.webp";
import Food_2 from "../../../assets/Images/food-2.png";
import Food_3 from "../../../assets/Images/food-3.png";
import Food_4 from "../../../assets/Images/food-4.png";
import Food_5 from "../../../assets/Images/food-5.webp";
import Food_6 from "../../../assets/Images/food-6.jpeg";
import Food_7 from "../../../assets/Images/food-7.webp";
import Food_8 from "../../../assets/Images/food-8.webp";
import Food_9 from "../../../assets/Images/food-9.jpg";
import Food_10 from "../../../assets/Images/food-10.jpg";
import Food_11 from "../../../assets/Images/food-11.jpg";
import Food_12 from "../../../assets/Images/food-12.jpg";
import Food_13 from "../../../assets/Images/food-13.jpg";
import Food_14 from "../../../assets/Images/food-14.jpg";
import Food_15 from "../../../assets/Images/food-15.jpg";
import Food_16 from "../../../assets/Images/food-16.webp";
const foodsData = [
  { id: 1, name: "Classic Burger", type: "Non-Veg", category: "Burger", price: 129, img: Food_1, desc: "Juicy beef patty with fresh veggies and cheese." },
  { id: 2, name: "Double Cheeseburger", type: "Non-Veg", category: "Burger", price: 179, img: Food_7, desc: "Double beef patty topped with melted cheese and fresh veggies." },
  { id: 3, name: "Margherita Pizza", type: "Veg", category: "Pizza", price: 249, img: Food_3, desc: "Classic pizza with fresh tomatoes, basil, and mozzarella cheese." },
  { id: 4, name: "Mushroom Pizza", type: "Veg", category: "Pizza", price: 269, img: Food_9, desc: "Delicious pizza loaded with fresh mushrooms and cheese." },
  { id: 5, name: "Carbonara Pasta", type: "Non-Veg", category: "Pasta", price: 199, img: Food_2, desc: "Creamy pasta with bacon, parmesan cheese, and a hint of garlic." },
  { id: 6, name: "Red Sauce Pasta", type: "Veg", category: "Pasta", price: 179, img: Food_8, desc: "Pasta tossed in a rich tomato and basil sauce." },
  { id: 7, name: "Garden Salad", type: "Veg", category: "Salad", price: 99, img: Food_4, desc: "Fresh garden vegetables with a light dressing." },
  { id: 8, name: "Prawn Salad", type: "Non-Veg", category: "Salad", price: 159, img: Food_10, desc: "Fresh prawns with crisp greens and light dressing." },
  { id: 9, name: "Schezwan Noodles", type: "Non-Veg", category: "Noodles", price: 149, img: Food_5, desc: "Spicy noodles with chicken and vegetables in Schezwan sauce." },
  { id: 10, name: "Hong Kong Fried Noodles", type: "Veg", category: "Noodles", price: 129, img: Food_11, desc: "Crispy fried noodles with vegetables and light soy sauce." },
  { id: 11, name: "Paneer Shawarma", type: "Veg", category: "Shawarma", price: 139, img: Food_6, desc: "Soft flatbread filled with spiced paneer and veggies." },
  { id: 12, name: "Mexican Shawarma", type: "Non-Veg", category: "Shawarma", price: 159, img: Food_12, desc: "Tender chicken with Mexican spices wrapped in flatbread." },
  { id: 13, name: "Fish Tacos", type: "Non-Veg", category: "Tacos", price: 149, img: Food_13, desc: "Crispy fish pieces with fresh veggies in a soft taco shell." },
  { id: 14, name: "Veggies Tacos", type: "Veg", category: "Tacos", price: 129, img: Food_14, desc: "Assorted fresh vegetables in a soft taco shell." },
  { id: 15, name: "Kimchi Fried Rice", type: "Non-Veg", category: "Fried Rice", price: 159, img: Food_15, desc: "Spicy fried rice with chicken, kimchi, and vegetables." },
  { id: 16, name: "Veg Fried Rice", type: "Veg", category: "Fried Rice", price: 139, img: Food_16, desc: "Fragrant fried rice with mixed vegetables and soy sauce." },
];


function Foods({ addToCart }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const [notification, setNotification] = useState(null);
  const typeRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (typeRef.current && !typeRef.current.contains(event.target)) setTypeDropdownOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(event.target)) setCategoryDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredFoods = foodsData.filter((food) => {
    const matchSearch = food.name.toLowerCase().includes(search.toLowerCase().trim());
    const matchType = filterType === "All" || food.type === filterType;
    const matchCategory = filterCategory === "All" || food.category === filterCategory;
    return matchSearch && matchType && matchCategory;
  });

  const handleAddToCart = (food) => {
    addToCart(food);
    setNotification(`Added ${food.name} to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="foods-container">
      <h2>Our Menu</h2>
      <p>Explore our delicious offerings</p>

      {notification && <div className="notification">{notification}</div>}

      <div className="filters">
        <div className="custom-input search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search foods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="custom-dropdown" ref={typeRef}>
          <div className="selected" onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}>
            {filterType} 
            <FaChevronDown className={`dropdown-arrow ${typeDropdownOpen ? "open" : ""}`} />
          </div>
          {typeDropdownOpen && (
            <ul className="dropdown-options">
              <li onClick={() => { setFilterType("All"); setTypeDropdownOpen(false); }}>All</li>
              <li onClick={() => { setFilterType("Veg"); setTypeDropdownOpen(false); }}>Vegetarian</li>
              <li onClick={() => { setFilterType("Non-Veg"); setTypeDropdownOpen(false); }}>Non-Vegetarian</li>
            </ul>
          )}
        </div>

        <div className="custom-dropdown" ref={categoryRef}>
          <div className="selected" onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}>
            {filterCategory} 
            <FaChevronDown className={`dropdown-arrow ${categoryDropdownOpen ? "open" : ""}`} />
          </div>
          {categoryDropdownOpen && (
            <ul className="dropdown-options">
              <li onClick={() => { setFilterCategory("All"); setCategoryDropdownOpen(false); }}>All</li>
              <li onClick={() => { setFilterCategory("Burger"); setCategoryDropdownOpen(false); }}>Burger</li>
              <li onClick={() => { setFilterCategory("Pizza"); setCategoryDropdownOpen(false); }}>Pizza</li>
              <li onClick={() => { setFilterCategory("Pasta"); setCategoryDropdownOpen(false); }}>Pasta</li>
              <li onClick={() => { setFilterCategory("Salad"); setCategoryDropdownOpen(false); }}>Salad</li>
              <li onClick={() => { setFilterCategory("Noodles"); setCategoryDropdownOpen(false); }}>Noodles</li>
              <li onClick={() => { setFilterCategory("Shawarma"); setCategoryDropdownOpen(false); }}>Shawarma</li>
              <li onClick={() => { setFilterCategory("Tacos"); setCategoryDropdownOpen(false); }}>Tacos</li>
              <li onClick={() => { setFilterCategory("Fried Rice"); setCategoryDropdownOpen(false); }}>Fried Rice</li>
            </ul>
          )}
        </div>
      </div>

      <div className="foods-grid">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <div key={food.id} className="food-card">
              <span className={food.type === "Veg" ? "tag veg" : "tag non-veg"}>{food.type}</span>
              <img src={food.img} alt={food.name} />
              <div className="food-card-content">
                <h3>{food.name}</h3>
                <p>{food.desc}</p>
                <p className="price">₹{food.price.toFixed(2)}</p>
                <button onClick={() => handleAddToCart(food)}><FaPlus /> Add</button>
              </div>
            </div>
          ))
        ) : (
          <p>No foods found.</p>
        )}
      </div>
    </div>
  );
}

export default Foods;
