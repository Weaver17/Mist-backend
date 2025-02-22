const Saved = require("../models/SavedModel");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const BadRequestError = require("../errors/BadRequestError");

// SAVE GAME
const saveGame = async (req, res, next) => {
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

    const savedGame = new Saved({
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

    await savedGame.save();

    res.status(200).json(savedGame);
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

const getSavedGames = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      throw new NotFoundError("User not found!");
    }

    const savedGames = await Saved.find({ user: userId });

    res.status(200).json({
      savedGames,
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

const getSaved = async (req, res, next) => {
  try {
    const { id } = req.params;
    const apiId = parseInt(req.params.id, 10);

    if (isNaN(apiId)) {
      throw new BadRequestError("Invalid Id");
    }

    const mongoId = await Saved.findMongoIdByApiId(apiId);

    if (!mongoId) {
      throw new NotFoundError("Game not found in saved games");
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

const deleteSavedGame = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const savedGame = await Saved.findById(id);

    if (!savedGame) {
      throw new NotFoundError("Game not found in saved games");
    }

    if (!savedGame.user.equals(userId)) {
      throw new UnauthorizedError("Access denied!");
    }

    await Saved.findByIdAndDelete(id);

    res.status(200).json({ message: "Game removed from saved games" });
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
  saveGame,
  getSavedGames,
  deleteSavedGame,
  getSaved,
};
