import React, { useState } from "react";
import "./auth.css";

const SignupForm = ({ onSignup, onSwitchToLogin }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      return alert("Passwords do not match.");
    }
    const { name, email, password } = userData;
    onSignup({ name, email, password });
  };

  return (
    <div className="auth-card glass-effect">
      <h2 className="auth-title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="signupName">Name</label>
          <input
            type="text"
            className="form-control"
            id="signupName"
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signupEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="signupEmail"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signupPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="signupPassword"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
      </form>
      <div className="auth-switch">
        <p>
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} className="switch-link">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;