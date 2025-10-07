import React, { useState } from "react";
import './Reviews.css'
import { FaUserCircle } from "react-icons/fa";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      name: "Sarah Johnson",
      rating: 5,
      review:
        "Amazing food and super fast delivery! The burger was perfect and still hot when it arrived.",
      date: "2 days ago",
    },
    {
      name: "Michael Chen",
      rating: 5,
      review:
        "Best pizza I have had in years. The crust was crispy and toppings were fresh. Highly recommend!",
      date: "1 week ago",
    },
  ]);

  const [form, setForm] = useState({ name: "", rating: 0, review: "" });
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.review) {
      showNotification("Please fill all fields ❗", "error");
      return;
    }
    setReviews([{ ...form, date: "Just now" }, ...reviews]);
    setForm({ name: "", rating: 0, review: "" });
    showNotification("Review submitted successfully 🎉", "success");
  };

  return (
    <div className="reviews-container">
      <h1>Customer Reviews</h1>
      <p className="subtitle">See what our customers are saying</p>

      <div className="review-form">
        <p className="form-title">Leave a Review</p>
        <form onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label>Rating</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= form.rating ? "star filled" : "star"}
                onClick={() => setForm({ ...form, rating: star })}
              >
                ★
              </span>
            ))}
          </div>

          <label>Your Review</label>
          <textarea
            placeholder="Write your review..."
            rows="4"
            value={form.review}
            onChange={(e) => setForm({ ...form, review: e.target.value })}
          />

          <button type="submit">Submit Review</button>
        </form>
      </div>

      <div className="reviews-list">
        <h2>All Reviews ({reviews.length})</h2>
        {reviews.map((r, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <div className="review-user">
                <FaUserCircle className="user-icon" />
                <p className="review-name">{r.name}</p>
              </div>
              <span className="review-date">{r.date}</span>
            </div>
            <div className="review-stars">
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </div>
            <p>{r.review}</p>
          </div>
        ))}
      </div>

      {notification.message && (
        <div className={`notification-popup ${notification.type}`}>
          <p>{notification.message}</p>
        </div>
      )}
    </div>
  );
}
