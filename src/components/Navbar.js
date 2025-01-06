import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS for Navbar styles
import newLogo from "../assets/new-logo.png"; // Import logo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-section">
        <img src={newLogo} alt="EduSphere Logo" className="navbar-logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/" className="active">Home</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/enrollments">Enrollments</Link></li>
      </ul>
      <div className="profile-icon">
        <Link to="/profile">
          <img src={require("../assets/profile-icon.png")} alt="Profile" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

