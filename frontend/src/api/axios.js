import axios from "axios";

const baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
