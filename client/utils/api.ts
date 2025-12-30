import axios from 'axios';

const api = axios.create({
  // OLD: baseURL: 'http://localhost:5000/api',
  // NEW (Live Cloud URL):
  baseURL: 'https://inventory-management-system-ipdw.onrender.com/api', 
});

export default api;