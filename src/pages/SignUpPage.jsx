import React from "react";
import SignUp from "../components/SignUp";
import { signupimage } from "../services/AppImage";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <>
      <div className="bg-richBlack flex h-screen bg-">
        <div className="w-full md:w-2/3 flex justify-center items-center">
          <div className="border border-eggShell p-4 md:p-6 rounded-lg text-center w-3/4  md:w-1/2 justify-items-center text-eggShell">
            <SignUp />
            <div className="mt-8 w-full">
              <p className="text-xs">Already have an account?</p>
              <Link to={"/login"}>
                <button className="text-sm rounded-md border mt-2 p-2 border-eggShell w-full">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-1/3">
          <img
            loading="lazy"
            className="object-cover w-full h-full"
            src={signupimage}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
