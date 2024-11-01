import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import ReactHowler from "react-howler";

const NowPlaying = ({
  queue,
  currentTrackIndex,
  handleNextTrack,
  isPlaying,
  setIsPlaying,
}) => {
  return (
    <>
      <div className="w-full max-w-3xl p-6 bg-black bg-opacity-30 border-x border-prussianBlue grid justify-items-center">
        <h2 className="font-bold">Now Playing</h2>
        <div className="">
          {queue.length > 0 && (
            <ReactHowler
              src={`http://localhost:5000${queue[currentTrackIndex].url}`}
              playing={isPlaying}
              format={["mp3"]}
              onEnd={handleNextTrack}
            />
          )}
        </div>

        <div>
          {queue.length > 0 && (
            <div className="grid justify-items-center gap-8">
              <div className="w-80 rounded-xl shadow-md overflow-hidden aspect-square">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:5000${queue[currentTrackIndex].coverArt}`}
                  alt=""
                />
              </div>
              <div className="player-controls text-center">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <button onClick={handleNextTrack}>
                    <Icon fontSize={24} icon={"fluent:previous-16-filled"} />
                  </button>
                  <button
                    className="bg-silverLakeBlue p-2 rounded-full"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <Icon
                      fontSize={24}
                      icon={isPlaying ? "mdi:pause" : "solar:play-bold"}
                    />
                  </button>
                  <button onClick={handleNextTrack}>
                    <Icon fontSize={24} icon={"fluent:next-16-filled"} />
                  </button>
                </div>
                <h2 className="text-2xl font-semibold">
                  {queue[currentTrackIndex].title}
                </h2>
                <p className="text-sm opacity-50">
                  {queue[currentTrackIndex].artist}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NowPlaying;
