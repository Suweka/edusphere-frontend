import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/enrollments">Enrollments</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
