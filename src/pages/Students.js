import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Students.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const navigate = useNavigate(); // To handle navigation

  // Fetch students and user role on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`/v1/students?page=${currentPage}`);
        setStudents(response.data.data); // Assuming API returns { data: [...], meta: { ... } }
        setTotalPages(response.data.meta.last_page); // Assuming API includes meta data for pagination
      } catch (err) {
        console.error("Error fetching students:", err);
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

    fetchStudents();
    fetchUserRole();
  }, [currentPage]); // Fetch data when currentPage changes

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await api.delete(`/v1/students/${id}`);
        setStudents((prev) => prev.filter((student) => student.id !== id));
        alert("Student deleted successfully.");
      } catch (err) {
        console.error("Error deleting student:", err);
        alert("Failed to delete student.");
      }
    }
  };

  // Handle Update
  const handleUpdate = (id) => {
    navigate(`/students/update/${id}`);
  };

  // Handle Pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Redirect to Add New Student Page
  const redirectToAddStudent = () => {
    navigate("/students/add");
  };

  return (
    <div className="students-container">
      <h1>Student List</h1>

      {/* Add New Student Button */}
      {userRole === "admin" && (
        <div className="add-student-button-container">
          <button onClick={redirectToAddStudent} className="add-student-button">
            Add New Student
          </button>
        </div>
      )}

      <table className="students-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>AGE</th>
            <th>CITY</th>
            <th>PHONE</th>
            <th>GENDER</th>
            {userRole === "admin" && <th>ACTIONS</th>}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>{student.city}</td>
              <td>{student.phone_number}</td>
              <td>{student.gender}</td>
              {userRole === "admin" && (
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(student.id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(student.id)}
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

export default Students;
