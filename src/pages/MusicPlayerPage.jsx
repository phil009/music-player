import React, { useEffect, useState } from "react";
import Discover from "../components/Discover";
import { getAllSongs } from "../services/songs";
import Navigation from "../components/Navigation";
import NowPlaying from "../components/NowPlaying";
import Queue from "../components/Queue";
import TracksListings from "../components/TracksListings";
import { toast } from "react-toastify";

const MusicPlayerPage = () => {
  const [songs, setSongs] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchSongs = async () => {
    const fetchedSongs = await getAllSongs();
    setSongs(fetchedSongs);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handlePlaySong = (index) => {
    setQueue([songs[index]]);
    setCurrentTrackIndex(0);
    setIsPlaying(true);
  };

  const addToQueue = (song) => {
    const isSongInQueue = queue.some(
      (queuedSong) => queuedSong._id === song._id
    );
    if (!isSongInQueue) {
      setQueue((prevQue) => [...prevQue, song]);
      toast.success("Added to queue");
    } else {
      toast.info("Song already in queue");
    }
  };

  const handleNextTrack = () => {
    if (queue.length > currentTrackIndex + 1) {
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    }
  };

  const removeFromQueue = (index) => {
    setQueue((prevQue) => prevQue.filter((_, i) => i !== index));

    if (index === currentTrackIndex && currentTrackIndex === queue.length - 1) {
      setIsPlaying(false);
    } else if (index < currentTrackIndex) {
      setCurrentTrackIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <>
      <div className="h-screen overflow-hidden text-eggShell bg-richBlack relative flex">
        <Navigation />
        <Discover
          songs={songs}
          handlePlaySong={handlePlaySong}
          addToQueue={addToQueue}
        />
        {isPlaying ? (
          <NowPlaying
            queue={queue}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentTrackIndex={currentTrackIndex}
            handleNextTrack={handleNextTrack}
          />
        ) : (
          <TracksListings
            songs={songs}
            queue={queue}
            addToQueue={addToQueue}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentTrackIndex={currentTrackIndex}
            handleNextTrack={handleNextTrack}
            handlePlaySong={handlePlaySong}
          />
        )}

        <Queue
          queue={queue}
          removeFromQueue={removeFromQueue}
          currentTrackIndex={currentTrackIndex}
        />
      </div>
    </>
  );
};

export default MusicPlayerPage;
