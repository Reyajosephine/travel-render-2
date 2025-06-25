// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

// Auth APIs
export const loginUser = (data) => API.post('/api/auth/login', data);
export const registerUser = (data) => API.post('/api/auth/register', data);
export const logoutUser = () => API.get('/api/auth/logout');

// Trip APIs
export const getTrips = () => API.get('/api/trips');
export const createTrip = (data) => API.post('/api/trips', data);
export const deleteTrip = (id) => API.delete(`/api/trips/${id}`);

// Joined Trips APIs
export const joinTrip = (data) => API.post('/api/joined-trips', data);
export const getJoinedTrips = () => API.get('/api/joined-trips');

