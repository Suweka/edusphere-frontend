import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/UpdateEnrollment.css";

const UpdateEnrollment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const response = await api.get(`/v1/enrollments/${id}`);
        setFormData(response.data.data);
      } catch (err) {
        console.error("Error fetching enrollment details:", err);
        setError("Failed to fetch enrollment details.");
      }
    };
    fetchEnrollment();
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

    try {
      await api.put(`/v1/enrollments/${id}`, formData);
      setSuccessMessage("Enrollment details updated successfully!");
      setTimeout(() => navigate("/enrollments"), 2000);
    } catch (err) {
      console.error("Error updating enrollment details:", err);
      setError("Failed to update enrollment details. Please try again.");
    }
  };

  return (
    <div className="update-enrollment-container">
      <h1>Update Enrollment</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course ID</label>
          <input
            type="number"
            name="course_id"
            value={formData.course_id || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Enrollment Date</label>
          <input
            type="date"
            name="enrollment_date"
            value={formData.enrollment_date || ""}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateEnrollment;
