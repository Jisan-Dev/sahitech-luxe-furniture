import axios from "axios";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
// request interceptor to add authorization header for every secure call to the api
privateApi.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    console.log("request stopped by interceptor before sent", token);
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);
