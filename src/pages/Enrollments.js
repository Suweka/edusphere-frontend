import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [role, setRole] = useState('viewer'); // Update based on logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch enrollments from the API
    api.get('/enrollments')
      .then(response => setEnrollments(response.data.data))
      .catch(error => console.error(error));

    // Fetch user role (this is a placeholder; replace with actual authentication logic)
    api.get('/user')
      .then(response => setRole(response.data.role))
      .catch(error => {
        console.error(error);
        // If not authenticated, redirect to login
        navigate('/login');
      });
  }, [navigate]);

  const handleDelete = (id) => {
    if (role === 'admin') {
      api.delete(`/enrollments/${id}`)
        .then(() => {
          setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h1>Enrollments</h1>
      <ul>
        {enrollments.map(enrollment => (
          <li key={enrollment.id}>
            <p>Enrollment ID: {enrollment.id}</p>
            <p>Student: {enrollment.student_name} (ID: {enrollment.student_id})</p>
            <p>Course: {enrollment.course_title} (ID: {enrollment.course_id})</p>
            <p>Date: {enrollment.enrollment_date}</p>
            {role === 'admin' && (
              <>
                {/* Implement Edit functionality as needed */}
                <button onClick={() => handleDelete(enrollment.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Enrollments;
