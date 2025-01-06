import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Ensure this matches your backend API
});

// Add a request interceptor to include the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle API responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove the token if unauthorized but DO NOT redirect
      console.warn("Unauthorized access - clearing token");
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error); // Pass the error back to the component
  }
);

export default api;
