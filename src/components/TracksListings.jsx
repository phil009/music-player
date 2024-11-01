import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import PlayerControls from "./PlayerControls";

const TracksListings = ({
  songs,
  queue,
  handleNextTrack,
  isPlaying,
  currentTrackIndex,
  addToQueue,
  setIsPlaying,
  handlePlaySong,
}) => {
  return (
    <>
      <div className="w-full max-w-3xl h-full p-6 bg-black bg-opacity-30 border-x border-prussianBlue flex flex-col justify-between items-start pt-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">All Songs</h2>
          <ul className="grid gap-4 grid-cols-4">
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
                    src={`http://localhost:5000${song.coverArt}`}
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
        </div>
        <PlayerControls
          songs={songs}
          queue={queue}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTrackIndex={currentTrackIndex}
          handleNextTrack={handleNextTrack}
          handlePlaySong={handlePlaySong}
        />
      </div>
    </>
  );
};

export default TracksListings;
