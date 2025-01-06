import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../components/Navbar"; // Import Navbar
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <main className="home-main">
        <div className="welcome-section">
          <h1 className="main-title">
            <span style={{ fontSize: "60px" }}>STUDENT</span>
            <br /> MANAGEMENT SYSTEM
          </h1>
          <p className="subtitle">
            Welcome to EduSphere, a modern Student Management System crafted for seamless academic 
            and administrative efficiency. With intuitive navigation and centralized features for 
            managing students, courses, enrollments, and user profiles, EduSphere empowers education 
            institutions to streamline operations and achieve excellence.
          </p>
          <div className="action-buttons">
            {/* Replace href with Link */}
            <Link to="/register" className="btn register-btn">Register</Link>
            <Link to="/login" className="btn login-btn">Login</Link>
          </div>
        </div>
        <div className="illustration">
          <img src={require("../assets/students-illustration.png")} alt="Students Illustration" />
        </div>
      </main>
      <footer className="footer">
        <p>© 2025 EduSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
