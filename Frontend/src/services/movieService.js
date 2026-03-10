import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/movies";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all movies
export const getAllMovies = async () => {
  const response = await api.get("/");
  return response.data;
};

// Get single movie by ID
export const getMovieById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Create a new movie
export const createMovie = async (movieData) => {
  const response = await api.post("/", movieData);
  return response.data;
};

// Update a movie
export const updateMovie = async (id, movieData) => {
  const response = await api.put(`/${id}`, movieData);
  return response.data;
};

// Delete a movie
export const deleteMovie = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};