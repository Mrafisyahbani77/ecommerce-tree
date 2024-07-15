import axios from 'axios';
export const AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

AxiosInstance.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );