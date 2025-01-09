import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/UpdateStudent.css";

const UpdateStudent = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch student details
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/v1/students/${id}`);
        setFormData(response.data.data);
        setOriginalData(response.data.data); // Save original data to detect changes
      } catch (err) {
        console.error("Error fetching student details:", err);
        setError("Failed to fetch student details.");
      }
    };
    fetchStudent();
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Compare with original data and send only updated fields
    const updatedFields = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== originalData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      setError("No changes detected.");
      return;
    }

    try {
      await api.put(`/v1/students/${id}`, updatedFields);
      setSuccessMessage("Student details updated successfully!");
      setTimeout(() => navigate("/students"), 2000); // Redirect after success
    } catch (err) {
      console.error("Error updating student details:", err);
      setError("Failed to update student details. Please try again.");
    }
  };

  return (
    <div className="update-student-container">
      <h1>Update Student</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
