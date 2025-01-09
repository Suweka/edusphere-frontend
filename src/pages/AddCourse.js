import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/AddCourse.css";

const AddCourse = () => {
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
  });
  const navigate = useNavigate();

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post("/v1/courses", newCourse);
      alert("Course added successfully.");
      navigate("/courses"); // Redirect to course list page
    } catch (err) {
      console.error("Error adding course:", err);
      alert("Failed to add course.");
    }
  };

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleAddCourse}>
        <input
          type="text"
          placeholder="Title"
          value={newCourse.title}
          onChange={(e) =>
            setNewCourse({ ...newCourse, title: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Duration (hours)"
          value={newCourse.duration}
          onChange={(e) =>
            setNewCourse({ ...newCourse, duration: e.target.value })
          }
        />
        <select
          value={newCourse.level}
          onChange={(e) =>
            setNewCourse({ ...newCourse, level: e.target.value })
          }
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
