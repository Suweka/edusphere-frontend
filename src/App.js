import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Students from './pages/Students';
import UpdateStudent from "./pages/UpdateStudent";
import AddStudent from "./pages/AddStudent";
import Courses from './pages/Courses';
import Enrollments from './pages/Enrollments';
import AddCourse from "./pages/AddCourse"; 
import AddEnrollment from "./pages/AddEnrollment";
import UpdateCourse from "./pages/UpdateCourse";
import UpdateEnrollment from "./pages/UpdateEnrollment";
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/update/:id" element={<UpdateStudent />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enrollments" element={<Enrollments />} />
        <Route path="/courses/add" element={<AddCourse />} />
        <Route path="/courses/update/:id" element={<UpdateCourse />} />
        <Route path="/enrollments/add" element={<AddEnrollment />} />
        <Route path="/enrollments/update/:id" element={<UpdateEnrollment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

