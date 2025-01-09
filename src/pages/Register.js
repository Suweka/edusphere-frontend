import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "viewer", // Default role
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userRole, setUserRole] = useState(null); // To track the logged-in user's role
  const navigate = useNavigate();

  // Fetch the user's role when the page loads
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await api.get("/user"); // Fetch the logged-in user's details
        setUserRole(response.data.role);
      } catch (err) {
        console.error("Error fetching user role:", err);
        setError("Failed to verify user role.");
      }
    };
    fetchUserRole();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await api.post("/register", formData);
      setSuccessMessage("Registration successful! Redirecting to login...");
      // Redirect to login page after a delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Failed to register. Please check your inputs and try again.");
      console.error(err);
    }
  };

  // Display Unauthorized message if the user is a viewer
  if (userRole === "viewer") {
    return (
      <div className="unauthorized-container">
        <h1 className="unauthorized-title">Unauthorized</h1>
        <p className="unauthorized-message">
          Only admins can access the registration page.
        </p>
      </div>
    );
  }

  // Render the registration form if the user is an admin
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-title">Register</h1>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={formData.password_confirmation}
          onChange={handleInputChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          required
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="register-button">
          Register
        </button>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
