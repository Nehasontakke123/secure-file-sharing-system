import axios from "axios";

const api = axios.create({
  baseURL: "https://secure-file-sharing-system-11wu.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
    "x-user-id": "65f123abc123abc123abc123", // mock auth
  },
});

export default api;
