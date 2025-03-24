import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Check if a user is already logged in
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://icepickgamer.pythonanywhere.com/api/login", {
        username,
        password,
      });

      // If login is successful, store the user in localStorage
      if (response.data.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
        setLoggedInUser(response.data.user);
      } else {
        alert("❌ Login failed. Please check your credentials!");
      }
    } catch (error) {
      alert("❌ Error logging in. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <div className="login-container">
      {loggedInUser ? (
        <div className="user-info">
          <h2>👋 Welcome, {loggedInUser.username}!</h2>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <h2>🔐 Login</h2>
          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">🚀 Login</button>
        </form>
      )}

      {/* Styles */}
      <style>
        {`
          .login-container {
            text-align: center;
            padding: 20px;
          }
          .login-form input {
            display: block;
            margin: 10px auto;
            padding: 10px;
            width: 80%;
            border: 1px solid #000;
            border-radius: 5px;
          }
          .login-form button, .logout-btn {
            background-color: black;
            color: gold;
            border: 2px solid black;
            padding: 10px 20px;
            cursor: pointer;
            margin-top: 10px;
          }
          .user-info {
            background: #222;
            color: white;
            padding: 20px;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
