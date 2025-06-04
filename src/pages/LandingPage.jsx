import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

export function LandingPage() {
  return (
    <div className="landing-container">
      <header className="oval-header">
        <h1>Welcome to the Gym App</h1>
        <p>Your one-stop app for managing gym members and subscriptions.</p>
      </header>

      <section className="button-section">
        <Link to="/add-member" className="btn">
          Add Member
        </Link>
        <Link to="/members" className="btn">
          Go to Members
        </Link>
        <Link to="/register" className="btn">
          CheckIn
        </Link>
      </section>

      <section className="features">
        <div className="feature-card gradient-purple">
          <h3>🏋️ Member Management</h3>
          <p>View, update, and organize all gym members with ease.</p>
        </div>
        <div className="feature-card gradient-orange">
          <h3>📅 Subscription Tracking</h3>
          <p>Track active and expired memberships by date and status.</p>
        </div>
        <div className="feature-card gradient-blue">
          <h3>📊 Health Insights</h3>
          <p>Monitor member BMI and health metrics over time.</p>
        </div>
      </section>

      <section className="gym-info">
        <div className="info-card">
          <h3>🕒 Gym Hours</h3>
          <ul>
            <li>Mon–Fri: 5:00 AM – 10:00 PM</li>
            <li>Saturday: 6:00 AM – 8:00 PM</li>
            <li>Sunday: 7:00 AM – 6:00 PM</li>
          </ul>
        </div>
        <div className="info-card">
          <h3>🏃‍♂️ Training Sessions</h3>
          <ul>
            <li>CrossFit – Mon/Wed/Fri: 6–7 AM</li>
            <li>Yoga – Tue/Thu: 5–6 PM</li>
            <li>HIIT – Daily: 7–8 PM</li>
            <li>Personal Training: By Appointment</li>
          </ul>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to get started?</h2>
        <p>Start managing your gym effortlessly today.</p>
        <Link to="/add-member" className="btn btn-cta">
          Add First Member
        </Link>
      </section>

      <footer className="oval-footer">
        <p>© 2025 Gym App. All rights reserved.</p>
      </footer>
    </div>
  );
}
