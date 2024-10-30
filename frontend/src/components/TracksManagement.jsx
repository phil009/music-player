import React, { useState } from "react";
import { deleteSong } from "../services/songs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";

const TracksManagement = ({ songs, onDeleteSuccess, onEditSong }) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [songToDelete, setSongToDelete] = useState("");

  const handleDeleteSong = async (ID) => {
    try {
      await deleteSong(ID);
      setConfirmModal(false);
      onDeleteSuccess();
      toast.success("Song Deleted");
    } catch (error) {
      console.error("Unable to Delete", error);
      toast.error("Unable to Delete");
    }
  };
  return (
    <>
      <div className="relative w-2/3 h-full bg-prussianBlue">
        {confirmModal && (
          <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
            <div className="bg-richBlack rounded-xl overflow-hidden max-w-sm w-full">
              <div className="flex justify-between border-b border-eggShell">
                <h2 className="text-lg font-semibold p-6">Confirm Deletion</h2>
              </div>
              <div className="bg-richBlack p-6">
                <p>
                  This particular song will be deleted, and cannot be undone
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleDeleteSong(songToDelete)}
                    id="confirmDelete"
                    className="border border-red-600 text-red-600 px-4 py-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setConfirmModal(false)}
                    id="cancelDelete"
                    className="border border-eggShell text-eggborder-eggShell px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="h-1/3"></div>
        <div className="h-2/3 p-6">
          <div className="p-4 shadow-lg rounded bg-paynesGray flex justify-between items-center gap-2">
            <div className="w-1/12 flex justify-start items-center">#</div>
            <div className="w-5/12 flex justify-start items-center">Title</div>
            <div className="w-2/12 flex justify-start items-center">Genre</div>
            <div className="w-2/12 flex justify-start items-center">
              <Icon icon={"tabler:clock"} />
            </div>
            <div className="w-2/12 flex justify-start items-center">
              Actions
            </div>
          </div>
          <ul className=" track-manage py-4 grid gap-2 max-h-[400px]">
            {songs.map((song, index) => (
              <li
                key={song._id}
                className="p-2 pr-0 rounded hover:bg-richBlack flex gap-2 justify-between"
              >
                <div className="w-1/12 flex justify-start items-center  ">
                  {index + 1}
                </div>
                <div className="w-5/12 flex justify-start items-start gap-2">
                  <div className="w-10 h-10 rounded">
                    <img
                      src={`http://localhost:5000${song.coverArt}`}
                      alt={`${song.title} cover art`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm capitalize font-medium">
                      {song.title}
                    </h2>
                    <p className="text-xs opacity-75 capitalize font-light">
                      {song.artist}
                    </p>
                  </div>
                </div>
                <div className="w-2/12 flex justify-start items-center">
                  <p className="text-sm capitalize">{song.genre}</p>
                </div>
                <div className="w-2/12 flex justify-start items-center">
                  <p>{song.duration}</p>
                </div>
                <div className="w-2/12 flex justify-start gap-2 items-center">
                  <button
                    onClick={() => onEditSong(song)}
                    className="rounded p-2 bg-paynesGray"
                  >
                    <Icon fontSize={20} icon={"mingcute:edit-line"} />
                  </button>
                  <button
                    onClick={() => {
                      setConfirmModal(true);
                      setSongToDelete(song._id);
                    }}
                    className="rounded p-2 bg-paynesGray"
                  >
                    <Icon fontSize={20} icon={"fluent:delete-16-regular"} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TracksManagement;
