import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    "x-user-id": "65f123abc123abc123abc123", // mock auth
  },
});

export default api;
