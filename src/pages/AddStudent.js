import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/AddStudent.css";

const AddStudent = () => {
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    age: "",
    city: "",
    phone_number: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await api.post("/v1/students", newStudent);
      alert("Student added successfully.");
      navigate("/students"); // Redirect to student list page
    } catch (err) {
      console.error("Error adding student:", err);
      alert("Failed to add student.");
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleAddStudent}>
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={newStudent.age}
          onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={newStudent.city}
          onChange={(e) => setNewStudent({ ...newStudent, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newStudent.phone_number}
          onChange={(e) => setNewStudent({ ...newStudent, phone_number: e.target.value })}
        />
        <select
          value={newStudent.gender}
          onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
