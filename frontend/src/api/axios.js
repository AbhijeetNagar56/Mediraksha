import axios from 'axios';

if (process.env.NODE_ENV !== 'production') {
  axios.defaults.baseURL = 'http://localhost:5000/api';
} else {
  axios.defaults.baseURL = '/api';
}


const axiosInstance = axios.create({
  baseURL: axios.defaults.baseURL, // your backend base URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
