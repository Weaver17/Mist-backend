const router = require("express").Router();

const userRouter = require("./users");

const { createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.post("/users", userRouter, createUser);

module.exports = router;
