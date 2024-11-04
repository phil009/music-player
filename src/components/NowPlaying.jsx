import { Icon } from "@iconify/react/dist/iconify.js";
import { ClipLoader } from "react-spinners";

const NowPlaying = ({
  queue,
  currentTrackIndex,
  handleNextTrack,
  isPlaying,
  setNowPlaying,
  duration,
  currentSeek,
  handleSeekChange,
  handlePreviousTrack,
  togglePlayPause,
  buffering,
  currentTime,
}) => {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <div className="relative w-full max-w-3xl p-6 bg-black bg-opacity-30 border-x border-prussianBlue grid justify-items-center">
        <button
          className="absolute top-6 right-6"
          onClick={() => setNowPlaying(false)}
        >
          <Icon icon={"mingcute:close-line"} />
        </button>

        <h2 className="mt-8 font-bold">Now Playing</h2>
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
              <div className="w-full player-controls text-center">
                <div className="flex items-center gap-2">
                  <p className="font-medium opacity-70">
                    {formatDuration(currentTime)}
                  </p>
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    step="0.1"
                    value={currentSeek}
                    onChange={handleSeekChange}
                    className="custom-seekbar w-full min-w-96 my-6"
                  />
                  <p className="font-medium opacity-70">
                    {formatDuration(duration)}
                  </p>
                </div>
                <div className="flex justify-center items-center gap-4 mb-4">
                  <button onClick={handlePreviousTrack}>
                    <Icon fontSize={24} icon={"fluent:previous-16-filled"} />
                  </button>
                  <button
                    className="bg-silverLakeBlue p-2 rounded-full"
                    onClick={togglePlayPause}
                    disabled={buffering}
                  >
                    {buffering ? (
                      <ClipLoader size={30} color="white" />
                    ) : (
                      <Icon
                        fontSize={24}
                        icon={isPlaying ? "mdi:pause" : "solar:play-bold"}
                      />
                    )}
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
