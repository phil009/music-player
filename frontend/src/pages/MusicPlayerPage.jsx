import React from "react";
import Discover from "../components/Discover";

import Navigation from "../components/Navigation";

const MusicPlayerPage = () => {
  return (
    <>
      <div className="h-screen text-eggShell bg-richBlack relative flex">
        <Navigation />
        <Discover />
      </div>
    </>
  );
};

export default MusicPlayerPage;
