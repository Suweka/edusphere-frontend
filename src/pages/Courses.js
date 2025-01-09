import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const navigate = useNavigate(); // To handle navigation

  // Fetch courses and user role on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get(`/v1/courses?page=${currentPage}`);
        setCourses(response.data.data); // Assuming API returns { data: [...], meta: { ... } }
        setTotalPages(response.data.meta.last_page); // Assuming API includes meta data for pagination
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    const fetchUserRole = async () => {
      try {
        const response = await api.get("/user");
        setUserRole(response.data.role);
      } catch (err) {
        console.error("Error fetching user role:", err);
      }
    };

    fetchCourses();
    fetchUserRole();
  }, [currentPage]); // Fetch data when currentPage changes

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.delete(`/v1/courses/${id}`);
        setCourses((prev) => prev.filter((course) => course.id !== id));
        alert("Course deleted successfully.");
      } catch (err) {
        console.error("Error deleting course:", err);
        alert("Failed to delete course.");
      }
    }
  };

  // Handle Update
  const handleUpdate = (id) => {
    navigate(`/courses/update/${id}`);
  };

  // Handle Pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Redirect to Add New Course Page
  const redirectToAddCourse = () => {
    navigate("/courses/add");
  };

  return (
    <div className="courses-container">
      <h1>Course List</h1>

      {/* Add New Course Button */}
      {userRole === "admin" && (
        <div className="add-course-button-container">
          <button onClick={redirectToAddCourse} className="add-course-btn">
            Add New Course
          </button>
        </div>
      )}

      <table className="courses-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Duration (Hours)</th>
            <th>Level</th>
            {userRole === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.duration}</td>
              <td>{course.level}</td>
              {userRole === "admin" && (
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(course.id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Courses;
