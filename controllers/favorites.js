const Favorite = require("../models/favorites");

const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");

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
const addFavorite = async (req, res) => {
  const favoriteData = req.body;
  const userId = req.user._id;
  try {
    const existingFavorite = await Favorite.findById(favoriteData.id).orFail(
      () => new NotFoundError("Item not found")
    );

    if (existingFavorite) {
      throw new Error("Game is already in your favorites");
    }

    const newFavorite = new Favorite({
      userId: userId,
      id: favoriteData.id,
      title: favoriteData.title,
      thumbnail: favoriteData.thumbnail,
      short_description: favoriteData.short_description,
      game_url: favoriteData.game_url,
      genre: favoriteData.genre,
      platform: favoriteData.platform,
      publisher: favoriteData.publisher,
      developer: favoriteData.developer,
      release_date: favoriteData.release_date,
      freetogame_profile_url: favoriteData.freetogame_profile_url,
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
    const favorite = await Favorite.findByIdAndDelete({
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
