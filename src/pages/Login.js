import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      console.log("Login Response:", response.data); // Debugging
      const token = response.data.access_token;
      if (token) {
        localStorage.setItem("authToken", token); // Save the token
        navigate("/profile"); // Redirect to profile page
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err) {
      console.error("Login Error:", err.response || err.message);
      setError("Invalid login credentials.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div>
        <label className="login-label">Email:</label>
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="login-label">Password:</label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="login-error">{error}</p>}
      <button className="login-button" type="submit">Login</button>
    </form>
  );
};

export default Login;
