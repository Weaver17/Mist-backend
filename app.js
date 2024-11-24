const express = require("express");

const mongoose = require("mongoose");

const router = require("./routes/index");

const { PORT = 3003 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/MIST")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
