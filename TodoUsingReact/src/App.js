import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./Components/Home/home";
import LoginForm from "./Components/userlogin";
import SignupForm from "./Components/usersign";

const API_URL = "http://localhost:3001";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userName, setUserName] = useState("");

  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  const handleSignup = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Signup failed");
      }
      alert("Signup successful! Please log in.");
      setShowSignup(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Login failed");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);
      setUserName(data.name);
      setIsLoggedIn(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">TODLIFY</a>
          {isLoggedIn && (
            <div className="d-flex">
               <span className="navbar-text me-3">Welcome, {userName}</span>
               <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>

      <main>
        {isLoggedIn ? (
          <Home />
        ) : (
          <div className="auth-container">
            {showSignup ? (
              <SignupForm onSignup={handleSignup} onSwitchToLogin={() => setShowSignup(false)} />
            ) : (
              <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setShowSignup(true)} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;