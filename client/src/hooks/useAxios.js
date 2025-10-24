import axios from "axios";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
