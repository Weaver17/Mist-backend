const Saved = require("../models/saved");

const getUserSaved = async (userId) => {
  try {
    const savedGames = await Saved.find({ userId }).sort({ createdAt: -1 });
    return savedGames;
  } catch (error) {
    console.error("Error fetching saved games:", error);
    throw new Error("Could not fetch saved games");
  }
};

const addSaved = async (req, res) => {
  const savedData = req.body;
  const userId = req.user._id;
  try {
    const existingSaved = await Saved.findOne({
      userId: userId,
      id: savedData.id,
    });

    if (existingSaved) {
      throw new Error("Game is already in your saved");
    }

    const newSaved = new Saved({
      userId: userId,
      id: savedData.id,
      title: savedData.title,
      thumbnail: savedData.thumbnail,
      short_description: savedData.short_description,
      game_url: savedData.game_url,
      genre: savedData.genre,
      platform: savedData.platform,
      publisher: savedData.publisher,
      developer: savedData.developer,
      release_date: savedData.release_date,
      freetogame_profile_url: savedData.freetogame_profile_url,
    });

    await newSaved.save();
    return newSaved;
  } catch (error) {
    console.error("Error adding saved:", error);
    throw new Error("Could not add saved");
  }
};

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

// const Saved = require("../models/saved");

// // Fetch all saved for the authenticated user
// const getUserSaved = async (userId) => {
//   try {
//     const savedGames = await Saved.find({ userId }).sort({ createdAt: -1 });
//     return savedGames;
//   } catch (error) {
//     console.error("Error fetching saved games:", error);
//     throw new Error("Could not fetch saved games");
//   }
// };

// // Add a favorite for the authenticated user
// const addSaved = async (req, res) => {
//   const savedData = req.body;
//   const userId = req.user._id;
//   try {
//     const existingSaved = await Saved.findOne({
//       userId: userId,
//       id: savedData.id,
//       title: savedData.title,
//       thumbnail: savedData.thumbnail,
//       short_description: savedData.short_description,
//       game_url: savedData.game_url,
//       genre: savedData.genre,
//       platform: savedData.platform,
//       publisher: savedData.publisher,
//       developer: savedData.developer,
//       release_date: savedData.release_date,
//       freetogame_profile_url: savedData.freetogame_profile_url,
//     });

//     if (existingSaved) {
//       throw new Error("Game is already in your saved");
//     }

//     const newSaved = new Saved({
//       userId: userId,
//       id: savedData.id,
//       title: savedData.title,
//       thumbnail: savedData.thumbnail,
//       short_description: savedData.short_description,
//       game_url: savedData.game_url,
//       genre: savedData.genre,
//       platform: savedData.platform,
//       publisher: savedData.publisher,
//       developer: savedData.developer,
//       release_date: savedData.release_date,
//       freetogame_profile_url: savedData.freetogame_profile_url,
//     });

//     await newSaved.save();
//     return newSaved;
//   } catch (error) {
//     console.error("Error adding saved:", error);
//     throw new Error("Could not add saved");
//   }
// };

// // Delete a favorite for the authenticated user
// const deleteSavedGame = async (userId, savedId) => {
//   try {
//     const savedGame = await Saved.findOneAndDelete({
//       _id: savedId,
//       userId,
//     });

//     if (!savedGame) {
//       throw new Error("Saved game not found or does not belong to the user");
//     }

//     return savedGame;
//   } catch (error) {
//     console.error("Error deleting saved game:", error);
//     throw new Error("Could not delete saved game");
//   }
// };

// module.exports = {
//   getUserSaved,
//   addSaved,
//   deleteSavedGame,
// };
