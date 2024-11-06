import axios from "axios";
import jwtDecode from "jwt-decode";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://music-player-backend-xv0z.onrender.com/api";

export const login = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, {
    username,
    password,
  });
  const token = response.data.token;
  localStorage.setItem("user", token);

  const decodedToken = jwtDecode(token);

  return { token, ...decodedToken };
};

export const signup = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/users/signup`, {
    username,
    password,
  });
  return response.data;
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("user");
  if (!token) return null;

  return jwtDecode(token);
};

export const logout = () => {
  localStorage.removeItem("user");
};
