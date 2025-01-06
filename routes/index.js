const router = require("express").Router();

const userRouter = require("./users");

const NotFoundError = require("../errors/NotFoundError");

const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

const { login, createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
