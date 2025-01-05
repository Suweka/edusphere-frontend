import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    api.get('/user').then(response => setUser(response.data));
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Profile;
