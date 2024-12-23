const Favorite = require("../models/favorites");

// Fetch all favorites for the authenticated user
const getUserFavorites = async (userId) => {
  try {
    const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 });
    return favorites;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw new Error("Could not fetch favorites");
  }
};

// Add a favorite for the authenticated user
const addFavorite = async (userId, favoriteData) => {
  try {
    const existingFavorite = await Favorite.findOne({
      userId,
      gameId: favoriteData.gameId,
    });

    if (existingFavorite) {
      throw new Error("Game is already in your favorites");
    }

    const newFavorite = new Favorite({
      userId,
      gameId: favoriteData.gameId,
      title: favoriteData.title,
      description: favoriteData.description,
      imageUrl: favoriteData.imageUrl,
    });

    await newFavorite.save();
    return newFavorite;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw new Error("Could not add favorite");
  }
};

// Delete a favorite for the authenticated user
const deleteFavorite = async (userId, favoriteId) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: favoriteId,
      userId,
    });

    if (!favorite) {
      throw new Error("Favorite not found or does not belong to the user");
    }

    return favorite;
  } catch (error) {
    console.error("Error deleting favorite:", error);
    throw new Error("Could not delete favorite");
  }
};

module.exports = {
  getUserFavorites,
  addFavorite,
  deleteFavorite,
};
