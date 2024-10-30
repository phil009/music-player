import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Upload from "../components/Upload";
import TracksManagement from "../components/TracksManagement";
import { getAllSongs, updateSong } from "../services/songs";

const AdminPage = () => {
  const [songs, setSongs] = useState([]);
  const [songToEdit, setSongToEdit] = useState(null);

  const fetchSongs = async () => {
    const fetchedSongs = await getAllSongs();
    setSongs(fetchedSongs);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleUploadSuccess = () => {
    fetchSongs();
  };

  const handleEditSong = (song) => {
    setSongToEdit(song);
    console.log(song);
  };

  const handleUpdateSong = async (formData) => {
    if (songToEdit) {
      try {
        await updateSong(songToEdit._id, formData); // Ensure FormData is sent correctly
        setSongToEdit(null);
        fetchSongs(); // Refresh song list to show updated info
      } catch (error) {
        console.error("Error updating song:", error);
      }
    }
  };

  return (
    <>
      <div className="h-screen text-eggShell bg-richBlack relative flex">
        <Navigation />
        <Upload
          onUploadSuccess={handleUploadSuccess}
          editSong={songToEdit}
          onUpdateSong={handleUpdateSong}
        />
        <TracksManagement
          onDeleteSuccess={handleUploadSuccess}
          songs={songs}
          onEditSong={handleEditSong}
        />
      </div>
    </>
  );
};

export default AdminPage;
