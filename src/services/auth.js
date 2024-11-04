import axios from "axios";
import jwtDecode from "jwt-decode";

export const login = async (username, password) => {
  const response = await axios.post("/api/users/login", { username, password });
  const token = response.data.token;
  localStorage.setItem("user", token);

  const decodedToken = jwtDecode(token);

  return { token, ...decodedToken };
};

export const signup = async (username, password) => {
  const response = await axios.post("/api/users/signup", {
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
