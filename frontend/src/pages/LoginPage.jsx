import React from "react";
import { loginimage } from "../services/AppImage";
import { Link } from "react-router-dom";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div className="flex h-screen bg-eggShell">
      <div className="flex flex-col w-full md:w-2/3 justify-center items-center">
        <div className="text-center border border-richBlack p-6 rounded-lg w-3/4 md:w-1/2">
          <Login />
          <div className="mt-8 w-full">
            <p className="text-xs">Don't have an account?</p>
            <Link to={"/signup"}>
              <button className="text-sm rounded-md border mt-2 p-2 border-richBlack w-full">
                Create An Account
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-1/3">
        <img
          loading="lazy"
          className="object-cover w-full h-full"
          src={loginimage}
          alt="Login"
        />
      </div>
    </div>
  );
};

export default LoginPage;
