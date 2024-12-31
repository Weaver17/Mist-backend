const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  id: { type: Number, required: true }, // ID from the 3rd party API
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  short_description: { type: String, required: true },
  game_url: { type: String, required: true },
  genre: { type: String, required: true },
  platform: { type: String, required: true },
  publisher: { type: String, required: true },
  developer: { type: String, required: true },
  release_date: { type: String, required: true },
  freetogame_profile_url: { type: String, required: true },
  //   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Saved", savedSchema);
