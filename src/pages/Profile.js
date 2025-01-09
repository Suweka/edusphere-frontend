import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await api.get("/user");
      setUser(response.data); // Set the user data
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching user details:", err.response || err.message);

      if (err.response?.status === 401) {
        setError("Unauthorized: Please log in again."); // Handle unauthorized error
      } else {
        setError("Failed to fetch user details."); // Handle other errors
      }
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetch user profile on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        user && (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
