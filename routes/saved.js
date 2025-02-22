const router = require("express").Router();

const {
  saveGame,
  getSaved,
  deleteSavedGame,
  getSavedGames,
} = require("../controllers/saved");

const auth = require("../middlewares/auth");

router.get("/saved", auth, getSavedGames);

router.get("/saved/:id", auth, getSaved);

router.post("/saved", auth, saveGame);

router.delete("/saved/:id", auth, deleteSavedGame);

module.exports = router;
