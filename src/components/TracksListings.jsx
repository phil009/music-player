import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import PlayerControls from "./PlayerControls";
import { ClipLoader } from "react-spinners";

const TracksListings = ({
  songs,
  queue,
  handleNextTrack,
  isPlaying,
  currentTrackIndex,
  addToQueue,
  setIsPlaying,
  handlePlaySong,
  loading,
  setNowPlaying,
  toggleQueue,
  toggleNav,
}) => {
  return (
    <>
      <div className="w-full h-full pad:max-w-3xl p-3 sm:p-6 bg-black bg-opacity-30 border-x border-prussianBlue flex flex-col justify-between items-start pt-8">
        <div className="w-full relative h-full max-h-96">
          <button
            className="absolute opacity-70 w-8 h-8 top-4 right-2 sm:hidden"
            onClick={() => toggleNav()}
          >
            <Icon
              fontSize={24}
              color="#F0EBD8"
              icon={"material-symbols:side-navigation"}
            />
          </button>
          <h2 className="text-2xl font-semibold mb-6">All Songs</h2>
          {loading ? (
            <div className="flex w-full h-full justify-center items-center">
              <ClipLoader color="white" size={64} />
            </div>
          ) : (
            <ul className="grid gap-4 grid-cols-2 max-h-[500px] sm:max-h-max overflow-y-scroll sm:grid-cols-4">
              {songs.map((song, index) => (
                <li
                  onClick={() => handlePlaySong(index)}
                  className="h-max"
                  key={index}
                >
                  <div className="relative aspect-square mb-2 rounded-lg overflow-hidden">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToQueue(song);
                      }}
                      className="absolute bg-eggShell p-1 text-richBlack rounded-sm top-2 right-2"
                    >
                      <Icon icon={"ph:queue"} />
                    </button>
                    <img
                      className="w-full h-full object-cover"
                      src={` https://music-player-backend-xv0z.onrender.com${song.coverArt}`}
                      alt=""
                    />
                  </div>
                  <p className="text-sm font-semibold overflow-hidden whitespace-nowrap">
                    {song.title}
                  </p>
                  <p className="text-[.6rem] opacity-60">{song.artist}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <PlayerControls
          songs={songs}
          queue={queue}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTrackIndex={currentTrackIndex}
          handleNextTrack={handleNextTrack}
          handlePlaySong={handlePlaySong}
          setNowPlaying={setNowPlaying}
          toggleQueue={toggleQueue}
        />
      </div>
    </>
  );
};

export default TracksListings;
