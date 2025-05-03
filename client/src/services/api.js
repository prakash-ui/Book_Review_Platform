import axios from 'axios';

const API = axios.create({
  baseURL: process.env.VITE_APP_API_URL || 'https://book-review-platform-gbq3.onrender.com/api',
});

// Automatically add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchBooks = (page = 1) => API.get(`/books?page=${page}`);
export const fetchBook = (id) => API.get(`/books/${id}`);
export const createBook = (book) => API.post('/books', book);
export const fetchReviews = (bookId) => API.get(`/reviews?bookId=${bookId}`);
export const createReview = (review) => API.post('/reviews', review);
export const fetchUser = (id) => API.get(`/users/${id}`);
export const updateUser = (id, user) => API.put(`/users/${id}`, user);
export const register = (user) => API.post('/auth/register', user);
export const login = (credentials) => API.post('/auth/login', credentials);
export const getCurrentUser = () => API.get('/auth/me');