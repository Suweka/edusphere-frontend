import React from "react";
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
            Welcome to EduSphere! Empowering education through efficient management.<br />
            Your hub for academic and administrative excellence.
          </p>
          <div className="action-buttons">
            <a href="#register" className="btn register-btn">Register</a>
            <a href="#login" className="btn login-btn">Login</a>
          </div>
        </div>
        <div className="illustration">
          <img src={require("../assets/students-illustration.png")} alt="Students Illustration" />
        </div>
      </main>
      <footer className="footer">
        <p>© 2025 EduSphere. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
