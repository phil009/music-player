const express = require("express");
const Song = require("../models/Song");
const { verifyToken, isAdmin } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// GET   /api/songs  get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST   /api/songs  add/upload song
router.post(
  "/",
  upload.fields([{ name: "audioFile" }, { name: "coverArt" }]),
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { title, artist, genre } = req.body;

    const song = new Song({
      title,
      artist,
      genre,
      url: `/uploads/${req.files["audioFile"][0].filename}`,
      coverArt: `/uploads/${req.files["coverArt"][0].filename}`,
    });
    try {
      const savedSong = await song.save();
      res.status(201).json(savedSong);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// GET   /api/songs/:id  get a specific song
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "song not found" });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/songs/:id - Update a specific song by ID
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id, // Find the song by its ID from the request URL
      req.body, // Use the request body to update the song
      {
        new: true, // Return the updated song (otherwise, it returns the original song)
        runValidators: true, // Run validation for the updated fields (if any)
      }
    );
    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" }); // If the song isn't found, return a 404
    }
    res.json(updatedSong); // Respond with the updated song object
  } catch (error) {
    res.status(400).json({ message: error.message }); // Return error if something goes wrong
  }
});

//DELETE /api/songs/:id - Delete a specific song
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) {
      res.status(404).json({ message: "song not found" });
    }
    res.json({ mesage: "song has been deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
