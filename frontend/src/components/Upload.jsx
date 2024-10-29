import React, { useState } from "react";
import { uploadSong } from "../services/songs";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";
import ClipLoader from "react-spinners/ClipLoader";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [coverArt, setCoverArt] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const handleAudioChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoadingAudio(true);
      setAudioFile(file);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoadingAudio(false); // Stop loading for audio
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);
    formData.append("audioFile", audioFile);
    formData.append("coverArt", coverArt);

    try {
      await uploadSong(formData);
      toast.success("Song uploaded");
      setTitle("");
      setArtist("");
      setGenre("");
      setAudioFile(null);
      setCoverArt(null);
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Upload failed. Try again");
    }
  };
  return (
    <>
      <div className="text-eggShell flex justify-center items-center h-full w-1/3 p-6">
        <form
          className="w-full text-sm grid justify-items-center gap-2"
          onSubmit={handleUpload}
        >
          <div className="border-2 border-dashed w-60 h-60 border-eggShell bg-prussianBlue rounded-lg p-6 mb-2 flex justify-center items-center">
            <label
              htmlFor="audioUpload"
              className="cursor-pointer text-center grid justify-items-center"
            >
              {loadingAudio ? (
                <ClipLoader loading={loadingAudio} size={40} color="#F0EBD8" />
              ) : (
                <Icon
                  fontSize={40}
                  icon={
                    audioFile ? "carbon:checkmark-filled" : "carbon:add-filled"
                  }
                />
              )}
              <p className="text-eggShell text-sm mt-4">
                {audioFile ? "Added" : "Click to upload image or drag it here."}
              </p>
              <input
                id="audioUpload"
                onChange={handleAudioChange}
                type="file"
                name="audioFile"
                accept="audio/*"
                required
                className="hidden"
              />
            </label>
          </div>

          <div className="my-6">
            <label
              htmlFor="coverArt"
              className="cursor-pointer flex gap-2 items-start"
            >
              <div className="w-20   h-20  border border-eggShell">
                {coverArt && (
                  <img
                    src={URL.createObjectURL(coverArt)}
                    alt="Cover Art"
                    className="w-full h-full object-cover rounded"
                  />
                )}
              </div>
              <div>
                <div className="py-2 px-4 mb-2 w-max text-sm bg-eggShell border-b-4 border-silverLakeBlue text-richBlack rounded-full">
                  Add Cover Art
                </div>
                <p className="text-xs">Minimum 500x500 size, JPG or PNG</p>
                <p className="text-red-600 text-xs">*required</p>
              </div>
              <input
                onChange={(e) => setCoverArt(e.target.files[0])}
                type="file"
                id="coverArt"
                className="hidden"
                accept="image/*"
                required
              />
            </label>
          </div>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-prussianBlue p-2 rounded"
            type="text"
            placeholder="Title"
            value={title}
            required
          />
          <input
            onChange={(e) => setArtist(e.target.value)}
            className="w-full bg-prussianBlue p-2 rounded"
            type="text"
            placeholder="Artist"
            value={artist}
            required
          />
          <input
            onChange={(e) => setGenre(e.target.value)}
            className="w-full bg-prussianBlue p-2 rounded"
            type="text"
            placeholder="Genre"
            value={genre}
            required
          />
          <button
            className="py-2 px-4 mt-2 w-full text-sm bg-eggShell border-b-4 border-silverLakeBlue text-richBlack rounded-full"
            type="submit"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default Upload;
