const Saved = require("../models/saved");

// Fetch all saved for the authenticated user
const getUserSaved = async (userId) => {
  try {
    const savedGames = await Saved.find({ userId }).sort({ createdAt: -1 });
    return savedGames;
  } catch (error) {
    console.error("Error fetching saved games:", error);
    throw new Error("Could not fetch saved games");
  }
};

// Add a favorite for the authenticated user
const addSaved = async (userId, savedData) => {
  try {
    const existingSavedGame = await Saved.findOne({
      userId,
      gameId: savedData.gameId,
    });

    if (existingSavedGame) {
      throw new Error("Game is already in your saved games");
    }

    const newSaved = new Saved({
      userId,
      gameId: savedData.gameId,
      title: savedData.title,
    });

    await newSaved.save();
    return newSaved;
  } catch (error) {
    console.error("Error adding saved game:", error);
    throw new Error("Could not add saved game");
  }
};

// Delete a favorite for the authenticated user
const deleteSavedGame = async (userId, savedId) => {
  try {
    const savedGame = await Saved.findOneAndDelete({
      _id: savedId,
      userId,
    });

    if (!savedGame) {
      throw new Error("Saved game not found or does not belong to the user");
    }

    return savedGame;
  } catch (error) {
    console.error("Error deleting saved game:", error);
    throw new Error("Could not delete saved game");
  }
};

module.exports = {
  getUserSaved,
  addSaved,
  deleteSavedGame,
};
