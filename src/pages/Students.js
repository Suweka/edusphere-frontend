import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [role, setRole] = useState('viewer'); // Update role based on logged-in user

  useEffect(() => {
    api.get('/students').then(response => setStudents(response.data));
  }, []);

  const handleDelete = (id) => {
    if (role === 'admin') {
      api.delete(`/students/${id}`).then(() => {
        setStudents(students.filter(student => student.id !== id));
      });
    }
  };

  return (
    <div>
      <h1>Students</h1>
      {role === 'admin' && <button>Add Student</button>}
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} ({student.email})
            {role === 'admin' && (
              <>
                <button>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
