const router = require("express").Router();

const auth = require("../middlewares/auth");

const { validateUserId } = require("../middlewares/validation");

const {
  getUserSaved,
  addSaved,
  deleteSavedGame,
} = require("../controllers/saved");

router.use(auth);

// POST /api/saved-games – Adds a game to saved games.
router.post("/", async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const saved = await addSaved(req);
    console.log(saved);
    res.status(201);
  } catch (error) {
    console.log(req.body);
    res.status(500).json({ error: "Failed to add saved" });
  }
});

// DELETE /api/saved-games/:id – Removes a game from saved games.
router.delete("/:id", async (req, res) => {
  try {
    await deleteSavedGame(req.user.id, req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete saved game" });
  }
});

// GET /api/saved-games – Fetches all saved games.
router.get("/", async (req, res) => {
  try {
    const saved = await getUserSaved(req.user._id);
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved games" });
  }
});

module.exports = router;
