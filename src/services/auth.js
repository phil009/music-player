import axios from "axios";

export const login = async (username, password) => {
  const response = await axios.post("/api/users/login", { username, password });
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

export const signup = async (username, password) => {
  const response = await axios.post("/api/users/signup", {
    username,
    password,
  });
  return response.data;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logout = () => {
  localStorage.removeItem("user");
};
