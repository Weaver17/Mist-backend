const router = require("express").Router();

const { favoriteGame, getFavoritedGames } = require("../controllers/favorite");

const auth = require("../middlewares/auth");

router.get("/favorites", auth, getFavoritedGames);

router.post("/favorite", auth, favoriteGame);

module.exports = router;
