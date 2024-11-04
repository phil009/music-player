import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

const Discover = ({ songs, addToQueue, handlePlaySong, loading }) => {
  const [isOverflowingTitle, setIsOverflowingTitle] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (titleRef.current) {
        setIsOverflowingTitle(
          titleRef.current.scrollWidth > titleRef.current.clientWidth
        );
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div className="p-6 max-w-[350px]">
      <h1 className="font-bold text-3xl mb-6">
        Discover <br /> New Music
      </h1>
      <p className="font-bold text-sm mb-3">Top Charts</p>
      <div className="flex justify-center items-center">
        {loading ? (
          <ClipLoader color="white" size={40} />
        ) : (
          <ul className="mb-8 grid max-h-[480px] gap-4 grid-cols-2">
            {songs.slice(0, 4).map((song, index) => (
              <li
                onClick={() => handlePlaySong(index)}
                className=" grid"
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
                <p
                  ref={titleRef}
                  className={`text-sm font-semibold overflow-hidden whitespace-nowrap ${
                    isOverflowingTitle ? "hover:animate-slide" : ""
                  }`}
                >
                  {song.title}
                </p>
                <p className="text-[.6rem] opacity-60">{song.artist}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="font-bold text-sm mb-3">You may like</h3>
      <div className="w-full flex justify-center items-center">
        {loading ? (
          <ClipLoader color="white" size={40} />
        ) : (
          <ul className=" tracks max-h-36 grid gap-1">
            {songs.map((song, index) => (
              <li
                key={index}
                onClick={() => handlePlaySong(index)}
                className="flex items-center gap-1"
              >
                <div className="w-2/12 aspect-square rounded overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:5000${song.coverArt}`}
                    alt=""
                  />
                </div>

                <div className="w-7/12">
                  <p
                    ref={titleRef}
                    className={`text-sm font-semibold overflow-hidden whitespace-nowrap ${
                      isOverflowingTitle ? "hover:animate-slide" : ""
                    }`}
                  >
                    {song.title}
                  </p>
                  <p className="text-[.6rem] opacity-60">{song.artist}</p>
                </div>
                <div className="w-2/12 flex justify-end text-xs">
                  <p>{song.duration}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Discover;
