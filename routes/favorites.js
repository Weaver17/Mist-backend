const router = require("express").Router();

const {
  favoriteGame,
  getFavoritedGames,
  deleteFavoritedGame,
  getFavorite,
} = require("../controllers/favorite");

const auth = require("../middlewares/auth");

router.get("/favorites", auth, getFavoritedGames);

router.get("/favorite/:id", auth, getFavorite);

router.post("/favorite", auth, favoriteGame);

router.delete("/favorite/:id", auth, deleteFavoritedGame);

module.exports = router;
