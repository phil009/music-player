import React, { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const onLogin = (userData) => {
    setUser(userData);
    navigate("/musicplayer");
    toast.success("Logged in successfully");
  };

  const onLogout = () => {
    setUser(null);
    navigate("/login");
  };
  return (
    <UserContext.Provider value={{ user, onLogin, onLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
