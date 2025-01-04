import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [role, setRole] = useState('viewer'); // Update based on logged-in user
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    duration: '',
    level: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses from the API
    api.get('/courses')
      .then(response => setCourses(response.data.data))
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
      api.delete(`/courses/${id}`)
        .then(() => {
          setCourses(courses.filter(course => course.id !== id));
        })
        .catch(error => console.error(error));
    }
  };

  const handleInputChange = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      api.post('/courses', newCourse)
        .then(response => {
          setCourses([...courses, response.data]);
          setNewCourse({
            title: '',
            description: '',
            duration: '',
            level: '',
          });
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h1>Courses</h1>
      {role === 'admin' && (
        <form onSubmit={handleAddCourse}>
          <h2>Add New Course</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newCourse.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newCourse.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (hours)"
            value={newCourse.duration}
            onChange={handleInputChange}
            required
          />
          <select
            name="level"
            value={newCourse.level}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <button type="submit">Add Course</button>
        </form>
      )}
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Duration: {course.duration} hours</p>
            <p>Level: {course.level}</p>
            {role === 'admin' && (
              <>
                {/* Implement Edit functionality as needed */}
                <button>Edit</button>
                <button onClick={() => handleDelete(course.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
