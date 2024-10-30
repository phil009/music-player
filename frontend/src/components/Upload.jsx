import React, { useEffect, useState } from "react";
import { updateSong, uploadSong } from "../services/songs";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";
import ClipLoader from "react-spinners/ClipLoader";

const Upload = ({ onUploadSuccess, editSong, onUpdateSong }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [coverArt, setCoverArt] = useState(null);
  const [duration, setDuration] = useState("");
  const [loadingAudio, setLoadingAudio] = useState(false);

  useEffect(() => {
    if (editSong) {
      setTitle(editSong.title || "");
      setArtist(editSong.artist || "");
      setGenre(editSong.genre || "");
      setCoverArt(editSong.coverArt || null);
      setDuration(editSong.duration || "");
    }
  }, [editSong]);

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Format as m:ss
  };

  const handleAudioChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file); // Log the selected file
      setLoadingAudio(true);
      setAudioFile(file);

      const audio = new Audio(URL.createObjectURL(file));
      console.log("Audio object created:", audio.src); // Log the audio URL

      audio.onloadeddata = () => {
        const duration = audio.duration; // Duration in seconds
        const formattedDuration = formatDuration(duration); // Convert to string if needed
        setDuration(formattedDuration); // Save the duration

        console.log("Audio duration:", formattedDuration); // Log duration
        setLoadingAudio(false); // Stop loading
      };

      audio.onerror = (error) => {
        console.error("Error loading audio file:", error); // Log error
        setLoadingAudio(false); // Stop loading on error
        toast.error("Failed to load audio. Please try again.");
      };

      await new Promise((resolve) => {
        audio.oncanplaythrough = () => resolve(); // Resolve the promise when metadata is loaded
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setArtist("");
    setGenre("");
    setAudioFile(null);
    setCoverArt(null);
    setDuration("");
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);
    formData.append("audioFile", audioFile); // Audio file is required in upload
    formData.append("coverArt", coverArt);
    formData.append("duration", duration);

    try {
      await uploadSong(formData);
      toast.success("Song uploaded successfully");
      resetForm();
      onUploadSuccess();
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Upload failed. Try again.");
    }
  };

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);
    if (coverArt) formData.append("coverArt", coverArt); // Only change cover art if provided
    formData.append("duration", duration);

    try {
      await onUpdateSong(formData); // Use onUpdateSong to send edited data
      toast.success("Song updated successfully");
      resetForm();
      onUploadSuccess();
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Update failed. Try again.");
    }
  };

  // In the form's onSubmit handler, call the appropriate function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editSong) {
      handleEdit();
    } else {
      handleUpload();
    }
  };

  return (
    <div className="text-eggShell flex justify-center items-center h-full w-1/3 p-6">
      <form
        className="w-full text-sm grid justify-items-center gap-2"
        onSubmit={handleSubmit}
      >
        {!editSong && (
          <div className="border-2 border-dashed w-60 h-60 border-prussianBlue bg-prussianBlue rounded-lg p-6 mb-2 flex justify-center items-center">
            <label
              htmlFor="audioUpload"
              className="  text-center grid justify-items-center"
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
                {audioFile ? "Added" : "Click to upload audio or drag it here"}
              </p>
              <p className="text-xs text-red-700">
                *Audio file cannot be changed
              </p>
              <input
                id="audioUpload"
                name="audioUpload"
                onChange={handleAudioChange}
                type="file"
                accept="audio/*"
                required
                className="hidden"
              />
            </label>
          </div>
        )}

        <div className="my-6">
          <label htmlFor="coverArt" className="flex gap-2 items-start">
            <div className="w-20 h-20 border border-eggShell">
              {coverArt && (
                <img
                  src={
                    typeof coverArt === "string"
                      ? `http://localhost:5000${coverArt}`
                      : URL.createObjectURL(coverArt)
                  }
                  alt="Cover Art"
                  className="w-full h-full object-cover rounded"
                />
              )}
            </div>
            <div>
              <div className="py-2 px-4 mb-2 w-max text-sm bg-eggShell border-b-4 border-silverLakeBlue text-richBlack rounded-full">
                {editSong ? "Change Cover Art" : "Add Cover Art"}
              </div>
              <p className="text-xs">Minimum 500x500 size, JPG or PNG</p>
              <p className="text-red-600 text-xs">*required</p>
            </div>

            <input
              onChange={(e) => setCoverArt(e.target.files[0])}
              type="file"
              id="coverArt"
              name="coverArt"
              className="hidden"
              accept="image/*"
              required={!editSong}
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
          {editSong ? "Update" : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default Upload;
