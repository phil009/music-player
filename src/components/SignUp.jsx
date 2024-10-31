import React, { useState } from "react";
import { signup } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import { toast } from "react-toastify";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, password);
      toast.success("Sign up successful");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("sign up failed", error);
      toast.error("Sign up failed");
    }
  };
  return (
    <form className="w-full grid gap-3" onSubmit={handleSubmit}>
      <input
        className="border-b border-gray-600 p-2"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        className="border-b border-gray-600 p-2"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button
        className="text-sm p-2 bg-eggShell border-b-4 border-white rounded-md text-richBlack hover:scale-95"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
