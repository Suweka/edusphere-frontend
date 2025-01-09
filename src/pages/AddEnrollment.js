import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/AddEnrollment.css";

const AddEnrollment = () => {
  const [newEnrollment, setNewEnrollment] = useState({
    student_id: "",
    course_id: "",
    enrollment_date: "",
  });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const studentResponse = await api.get("/v1/students");
        const courseResponse = await api.get("/v1/courses");
        setStudents(studentResponse.data.data);
        setCourses(courseResponse.data.data);
      } catch (err) {
        console.error("Error fetching students and courses:", err);
      }
    };
    fetchStudentsAndCourses();
  }, []);

  const handleAddEnrollment = async (e) => {
    e.preventDefault();
    try {
      await api.post("/v1/enrollments", newEnrollment);
      alert("Enrollment added successfully.");
      navigate("/enrollments"); // Redirect to enrollment list page
    } catch (err) {
      console.error("Error adding enrollment:", err);
      alert("Failed to add enrollment.");
    }
  };

  return (
    <div className="add-enrollment-container">
      <h2>Add New Enrollment</h2>
      <form onSubmit={handleAddEnrollment}>
        <select
          value={newEnrollment.student_id}
          onChange={(e) =>
            setNewEnrollment({ ...newEnrollment, student_id: e.target.value })
          }
          required
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
        <select
          value={newEnrollment.course_id}
          onChange={(e) =>
            setNewEnrollment({ ...newEnrollment, course_id: e.target.value })
          }
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={newEnrollment.enrollment_date}
          onChange={(e) =>
            setNewEnrollment({
              ...newEnrollment,
              enrollment_date: e.target.value,
            })
          }
          required
        />
        <button type="submit">Add Enrollment</button>
      </form>
    </div>
  );
};

export default AddEnrollment;
