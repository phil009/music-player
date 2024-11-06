import React, { useEffect, useState, useRef } from "react";
import Discover from "../components/Discover";
import { getAllSongs } from "../services/songs";
import Navigation from "../components/Navigation";
import NowPlaying from "../components/NowPlaying";
import Queue from "../components/Queue";
import TracksListings from "../components/TracksListings";
import { toast } from "react-toastify";
import ReactHowler from "react-howler";

const MusicPlayerPage = () => {
  const playerRef = useRef(null);
  const [buffering, setBuffer] = useState(false);
  const [currentSeek, setCurrentSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [nowPlaying, setNowPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [openQueue, setOpenQueue] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const fetchSongs = async () => {
    setLoading(true);
    const fetchedSongs = await getAllSongs();
    setSongs(fetchedSongs);
    setLoading(false);
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
    console.log(song);
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

  useEffect(() => {
    let interval;

    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        setCurrentTime(playerRef.current.seek());
        setCurrentSeek(playerRef.current.seek());
      }, 1000);
    } else {
      clearInterval(interval);
    }
    console.log(currentTrackIndex);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSeekChange = (e) => {
    const newSeek = parseFloat(e.target.value);
    playerRef.current.seek(newSeek);
    setCurrentSeek(newSeek);
  };

  const handleLoad = () => {
    setBuffer(false);
    setDuration(playerRef.current.duration());
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handlePreviousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((prevIndex) => prevIndex - 1);
      setIsPlaying(true);
      setBuffer(true);
    }
  };

  const toggleQueue = () => {
    setOpenQueue(!openQueue);
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <>
      <div className="h-screen overflow-hidden text-eggShell bg-richBlack relative flex">
        <Navigation openNav={openNav} />
        <Discover
          songs={songs}
          handlePlaySong={handlePlaySong}
          addToQueue={addToQueue}
          loading={loading}
        />
        <div className="">
          {queue.length > 0 && (
            <ReactHowler
              ref={playerRef}
              src={` https://music-player-backend-xv0z.onrender.com${queue[currentTrackIndex].url}`}
              playing={isPlaying}
              format={["mp3"]}
              onLoad={handleLoad}
              onLoadError={() => setBuffer(false)}
              onEnd={handleNextTrack}
            />
          )}
        </div>
        {nowPlaying ? (
          <NowPlaying
            queue={queue}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentTrackIndex={currentTrackIndex}
            setCurrentTrackIndex={setCurrentTrackIndex}
            handleNextTrack={handleNextTrack}
            loading={loading}
            setNowPlaying={setNowPlaying}
            duration={duration}
            currentSeek={currentSeek}
            handlePreviousTrack={handlePreviousTrack}
            togglePlayPause={togglePlayPause}
            buffering={buffering}
            handleSeekChange={handleSeekChange}
            currentTime={currentTime}
          />
        ) : (
          <TracksListings
            toggleNav={toggleNav}
            songs={songs}
            queue={queue}
            addToQueue={addToQueue}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentTrackIndex={currentTrackIndex}
            handleNextTrack={handleNextTrack}
            loading={loading}
            handlePlaySong={handlePlaySong}
            setNowPlaying={setNowPlaying}
            toggleQueue={toggleQueue}
          />
        )}

        <Queue
          openQueue={openQueue}
          setOpenQueue={setOpenQueue}
          queue={queue}
          removeFromQueue={removeFromQueue}
          currentTrackIndex={currentTrackIndex}
        />
      </div>
    </>
  );
};

export default MusicPlayerPage;
