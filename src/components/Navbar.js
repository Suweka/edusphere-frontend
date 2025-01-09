import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation to track the current route
import api from "../utils/api";
import "./Navbar.css"; // Import CSS for Navbar styles
import newLogo from "../assets/new-logo.png"; // Import logo

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation(); // Get the current route

  const fetchUser = async () => {
    try {
      const response = await api.get("/user");
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user info on mount
  }, []);

  return (
    <nav
      className="navbar"
      style={{
        position: "fixed", // Ensure the navbar stays at the top
        top: "0", // Align to the top of the page
        left: "0", // Align to the left of the page
        width: "100%", // Make the navbar span the full width
        zIndex: 1000, // Ensure it stays above other elements
        display: "flex", // Align items horizontally
        justifyContent: "space-between", // Space out navbar items
        alignItems: "center", // Vertically center the items
        backgroundColor: "#11084b", // Match the theme
        padding: "10px 20px", // Add padding around the content
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Add a shadow for visual depth
      }}
    >
      <div className="logo-section">
        <img src={newLogo} alt="EduSphere Logo" className="navbar-logo" />
      </div>
      <ul
        className="nav-links"
        style={{
          listStyle: "none", // Remove default list styling
          display: "flex", // Align links horizontally
          margin: "0", // Remove default margin
          padding: "0", // Remove default padding
        }}
      >
        <li style={{ margin: "0 10px" }}>
          <Link
            to="/"
            style={{
              color: location.pathname === "/" ? "#ff27c3" : "#fff", // Pink for active link
              textDecoration: "none",
            }}
          >
            Home
          </Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link
            to="/students"
            style={{
              color: location.pathname === "/students" ? "#ff27c3" : "#fff", // Pink for active link
              textDecoration: "none",
            }}
          >
            Students
          </Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link
            to="/courses"
            style={{
              color: location.pathname === "/courses" ? "#ff27c3" : "#fff", // Pink for active link
              textDecoration: "none",
            }}
          >
            Courses
          </Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link
            to="/enrollments"
            style={{
              color: location.pathname === "/enrollments" ? "#ff27c3" : "#fff", // Pink for active link
              textDecoration: "none",
            }}
          >
            Enrollments
          </Link>
        </li>
      </ul>
      <div
        className="profile-icon"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px", // Add spacing between profile link and other elements
        }}
      >
        <Link to="/profile">
          <img
            src={require("../assets/profile-icon.png")}
            alt="Profile"
            style={{
              width: "40px", // Adjust the profile icon size
              height: "40px",
              borderRadius: "50%", // Make the profile icon circular
            }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
