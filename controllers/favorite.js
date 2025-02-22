const Favorite = require("../models/favoriteModel");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const BadRequestError = require("../errors/BadRequestError");

// FAVORITE GAME
const favoriteGame = async (req, res, next) => {
  try {
    const {
      developer,
      freetogame_profile_url,
      game_url,
      genre,
      id,
      platform,
      publisher,
      release_date,
      short_description,
      thumbnail,
      title,
    } = req.body;

    const favoritedGame = new Favorite({
      developer,
      freetogame_profile_url,
      game_url,
      genre,
      id,
      platform,
      publisher,
      release_date,
      short_description,
      thumbnail,
      title,
      user: req.user._id,
    });

    await favoritedGame.save();

    res.status(200).json(favoritedGame);
  } catch (e) {
    console.error(e);
    if (e instanceof ConflictError) {
      next(e);
    }
    if (e.name === "ValidationError") {
      return next(new BadRequestError("Invalid Data"));
    }

    return next(e);
  }
};

const getFavoritedGames = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      throw new NotFoundError("User not found!");
    }

    const favoritedGames = await Favorite.find({ user: userId });

    res.status(200).json({
      favoritedGames,
    });
  } catch (e) {
    console.error(e);
    if (e instanceof ConflictError) {
      next(e);
    }
    if (e.name === "ValidationError") {
      return next(new BadRequestError("Invalid Data"));
    }

    return next(e);
  }
};

const getFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const apiId = parseInt(req.params.id, 10);

    if (isNaN(apiId)) {
      throw new BadRequestError("Invalid Id");
    }

    const mongoId = await Favorite.findMongoIdByApiId(apiId);

    if (!mongoId) {
      throw new NotFoundError("Game not found in favorites");
    }

    res.json({ mongoId });
  } catch (e) {
    console.error(e);
    if (e instanceof ConflictError) {
      next(e);
    }
    if (e.name === "ValidationError") {
      return next(new BadRequestError("Invalid Data"));
    }

    return next(e);
  }
};

const deleteFavoritedGame = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const favoritedGame = await Favorite.findById(id);

    if (!favoritedGame) {
      throw new NotFoundError("Game not found in favorites");
    }

    if (!favoritedGame.user.equals(userId)) {
      throw new UnauthorizedError("Access denied!");
    }

    await Favorite.findByIdAndDelete(id);

    res.status(200).json({ message: "Game removed from favorites" });
  } catch (e) {
    console.error(e);
    if (e instanceof ConflictError) {
      next(e);
    }
    if (e.name === "ValidationError") {
      return next(new BadRequestError("Invalid Data"));
    }

    return next(e);
  }
};

module.exports = {
  favoriteGame,
  getFavoritedGames,
  deleteFavoritedGame,
  getFavorite,
};
