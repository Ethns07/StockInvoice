import axios from "axios";

const api = axios.create({
  baseURL: "/api", // This will be proxied by Vite to http://localhost:1337/api
});

// Interceptor to add the JWT token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
