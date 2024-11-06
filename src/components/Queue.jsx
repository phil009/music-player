import { Icon } from "@iconify/react/dist/iconify.js";
import React, { memo } from "react";

const Queue = memo(
  ({ openQueue, setOpenQueue, queue, removeFromQueue, currentTrackIndex }) => {
    return (
      <>
        <div
          className={`absolute md:relative right-0 top-0 max-w-72 lg:max-w-sm bg-richBlack grid md:grid-cols-[1fr] transition-all ease-in-out ${
            openQueue ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-6 w-full relative">
              {queue.length > 0 ? (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold border-b border-eggShell mb-4 w-max">
                      Queue
                    </h3>
                    <button onClick={() => setOpenQueue(false)}>
                      <Icon icon={"mingcute:close-line"} />
                    </button>
                  </div>
                  <ul className="grid gap-2">
                    {queue.map((track, index) => (
                      <li
                        key={track._id}
                        className={`flex w-full items-center gap-2 py-2 border-b border-prussianBlue ${
                          index === currentTrackIndex
                            ? "current-track text-silverLakeBlue"
                            : ""
                        }`}
                      >
                        <div className="w-1/12 aspect-square rounded overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={` https://music-player-backend-xv0z.onrender.com${track.coverArt}`}
                            alt=""
                          />
                        </div>

                        <div className="w-5/12">
                          <p className="text-sm font-semibold overflow-hidden whitespace-nowrap">
                            {track.title}
                          </p>
                          <p className="text-[.6rem] opacity-60">
                            {track.artist}
                          </p>
                        </div>
                        <div className="w-2/12 flex justify-end text-xs">
                          <p>{track.duration}</p>
                        </div>

                        <button onClick={() => removeFromQueue(index)}>
                          <Icon icon={"line-md:close"} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <div className="w-full h-full opacity-50 text-center flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Nothing in queue</h1>
                    <p className="text-xs">Start listening</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Queue;
