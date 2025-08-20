import React, { useState } from "react";
import "./auth.css";

const LoginForm = ({ onLogin, onSwitchToSignup }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      return alert("Please enter both email and password.");
    }
    onLogin(credentials);
  };

  return (
    <div className="auth-card glass-effect">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
      <div className="auth-switch">
        <p>
          Don't have an account?{" "}
          <button onClick={onSwitchToSignup} className="switch-link">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;