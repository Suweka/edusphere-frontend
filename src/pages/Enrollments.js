import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Enrollments.css";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const navigate = useNavigate(); // To handle navigation

  // Fetch enrollments and user role on component mount
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await api.get(`/v1/enrollments?page=${currentPage}`);
        setEnrollments(response.data.data); // Assuming API returns { data: [...], meta: { ... } }
        setTotalPages(response.data.meta.last_page); // Assuming API includes meta data for pagination
      } catch (err) {
        console.error("Error fetching enrollments:", err);
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

    fetchEnrollments();
    fetchUserRole();
  }, [currentPage]); // Fetch data when currentPage changes

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enrollment?")) {
      try {
        await api.delete(`/v1/enrollments/${id}`);
        setEnrollments((prev) =>
          prev.filter((enrollment) => enrollment.id !== id)
        );
        alert("Enrollment deleted successfully.");
      } catch (err) {
        console.error("Error deleting enrollment:", err);
        alert("Failed to delete enrollment.");
      }
    }
  };

  // Handle Update
  const handleUpdate = (id) => {
    navigate(`/enrollments/update/${id}`);
  };

  // Handle Pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Redirect to Add New Enrollment Page
  const redirectToAddEnrollment = () => {
    navigate("/enrollments/add");
  };

  return (
    <div className="enrollments-container">
      <h1>Enrollment List</h1>

      {/* Add New Enrollment Button */}
      {userRole === "admin" && (
        <div className="add-enrollment-button-container">
          <button
            onClick={redirectToAddEnrollment}
            className="add-enrollment-button"
          >
            Add New Enrollment
          </button>
        </div>
      )}

      <table className="enrollments-table">
        <thead>
          <tr>
            <th>STUDENT ID</th>
            <th>COURSE ID</th>
            <th>ENROLLMENT DATE</th>
            {userRole === "admin" && <th>ACTIONS</th>}
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.student_id}</td>
              <td>{enrollment.course_id}</td>
              <td>{enrollment.enrollment_date}</td>
              {userRole === "admin" && (
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(enrollment.id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(enrollment.id)}
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

export default Enrollments;
