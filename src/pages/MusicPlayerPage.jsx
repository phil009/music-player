import React, { useEffect, useState } from "react";
import Discover from "../components/Discover";
import { getAllSongs } from "../services/songs";
import Navigation from "../components/Navigation";

const MusicPlayerPage = () => {
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    const fetchedSongs = await getAllSongs();
    setSongs(fetchedSongs);
  };

  useEffect(() => {
    fetchSongs();
  }, []);
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
