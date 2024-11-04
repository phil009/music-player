import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const PlayerControls = ({
  queue,
  currentTrackIndex,
  handleNextTrack,
  isPlaying,
  setIsPlaying,
  setNowPlaying,
}) => {
  return (
    <>
      {queue.length > 0 && (
        <div
          onClick={() => setNowPlaying(true)}
          className="w-full bg-richBlack p-4 flex items-center justify-between gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 rounded shadow-md overflow-hidden aspect-square">
              <img
                className="w-full h-full object-cover"
                src={`http://localhost:5000${queue[currentTrackIndex].coverArt}`}
                alt=""
              />
            </div>
            <div>
              <h2 className="text-base">{queue[currentTrackIndex].title}</h2>
              <p className="text-xs opacity-50">
                {queue[currentTrackIndex].artist}
              </p>
            </div>
          </div>
          <div className="player-controls text-center">
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextTrack();
                }}
              >
                <Icon fontSize={24} icon={"fluent:previous-16-filled"} />
              </button>
              <button
                className="bg-silverLakeBlue p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
              >
                <Icon
                  fontSize={24}
                  icon={isPlaying ? "mdi:pause" : "solar:play-bold"}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextTrack();
                }}
              >
                <Icon fontSize={24} icon={"fluent:next-16-filled"} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerControls;
