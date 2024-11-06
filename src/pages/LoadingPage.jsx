import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-[100dvh] bg-richBlack">
      <ClipLoader color="#F0EBD8" size={60} />
    </div>
  );
};

export default LoadingPage;
