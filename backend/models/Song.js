const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String, required: true },
  genre: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
