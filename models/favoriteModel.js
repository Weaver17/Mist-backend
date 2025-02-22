const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  developer: {
    type: String,
  },
  freetogame_profile_url: {
    type: String,
  },
  game_url: {
    type: String,
  },
  genre: {
    type: String,
  },
  id: {
    type: Number,
  },
  platform: {
    type: String,
  },
  publisher: {
    type: String,
  },
  release_date: {
    type: String,
  },
  short_description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  title: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

favoriteSchema.statics.findMongoIdByApiId = function findMongoIdByApiId(id) {
  return this.findOne({ id })
    .select("_id")
    .then((game) => {
      console.log(id);
      if (!game) {
        return Promise.reject(new Error("Game not found"));
      }
      return game;
    });
};

module.exports = mongoose.model("favorite", favoriteSchema);
