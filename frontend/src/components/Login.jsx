import { useState } from "react";
import { login } from "../services/auth";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(username, password);
      onLogin(user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form className="w-full grid gap-3" onSubmit={handleSubmit}>
      <input
        className="border-b border-richBlack p-2"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        className="border-b border-richBlack p-2"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button
        className="text-sm p-2 bg-white border-b-2 border-richBlack rounded-md text-richBlack hover:scale-95"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
