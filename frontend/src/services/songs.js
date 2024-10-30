import axios from "axios";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
};

export const uploadSong = async (songData) => {
  try {
    const token = getToken();
    console.log("Token:", token);
    const response = await axios.post("/api/songs", songData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding new song", error);
    throw error;
  }
};

export const getAllSongs = async () => {
  const response = await axios.get("/api/songs");
  return response.data;
};

export const updateSong = async (ID, editedSong) => {
  try {
    const token = getToken();
    const response = await axios.put(`/api/songs/${ID}`, editedSong, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating song:",
      error.response?.data?.message || error.message
    );
  }
};

export const deleteSong = async (ID) => {
  try {
    const token = getToken();
    const response = await axios.delete(`/api/songs/${ID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating song:",
      error.response?.data?.message || error.message
    );
  }
};
