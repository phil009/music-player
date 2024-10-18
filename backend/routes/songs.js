const express = require("express");
const Song = require("../models/Song");

const router = express.Router();

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
router.post("/", async (req, res) => {
  const song = new Song(req.body);
  try {
    const savedSong = await song.save();
    res.status(201).json(savedSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET   /api/songs/:id  get a specific song
router.post("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are applied during update
    });
  } catch (error) {}
});

module.exports = router;
