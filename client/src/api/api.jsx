import axios from "axios";

// ✅ Automatically picks correct backend
const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api" // LOCAL backend
    : "https://secure-file-sharing-system-11wu.vercel.app/api"; // VERCEL backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-user-id": "65f123abc123abc123abc123", // mock auth
  },
});

export default api;
