import React from "react";
import Navigation from "../components/Navigation";
import Upload from "../components/Upload";

const AdminPage = () => {
  return (
    <>
      <div className="h-screen text-eggShell bg-richBlack relative flex">
        <Navigation />
        <Upload />
      </div>
    </>
  );
};

export default AdminPage;
