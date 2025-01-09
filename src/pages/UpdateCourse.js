import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/UpdateCourse.css";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/v1/courses/${id}`);
        setFormData(response.data.data);
        setOriginalData(response.data.data);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("Failed to fetch course details.");
      }
    };
    fetchCourse();
  }, [id]);

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
      await api.put(`/v1/courses/${id}`, updatedFields);
      setSuccessMessage("Course details updated successfully!");
      setTimeout(() => navigate("/courses"), 2000);
    } catch (err) {
      console.error("Error updating course details:", err);
      setError("Failed to update course details. Please try again.");
    }
  };

  return (
    <div className="update-course-container">
      <h1>Update Course</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Duration</label>
          <input
            type="number"
            name="duration"
            value={formData.duration || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Level</label>
          <select
            name="level"
            value={formData.level || ""}
            onChange={handleInputChange}
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCourse;
