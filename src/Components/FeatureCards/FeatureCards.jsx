import React from "react";
import "./FeatureCards.css";
import { FaTruck, FaStar, FaClock } from "react-icons/fa";

const features = [
  {
    icon: <FaTruck />,
    title: "Fast Delivery",
    description: "Get your food delivered within 30 minutes",
  },
  {
    icon: <FaStar />,
    title: "Quality Food",
    description: "Fresh ingredients and expert preparation",
  },
  {
    icon: <FaClock />,
    title: "24/7 Service",
    description: "Order anytime, anywhere, any day",
  },
];

const FeatureCards = () => {
  return (
    <div className="feature-cards">
      {features.map((feature, index) => (
        <div className="card" key={index}>
          <div className="icon">{feature.icon}</div>
          <h3 className="title">{feature.title}</h3>
          <p className="description">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
