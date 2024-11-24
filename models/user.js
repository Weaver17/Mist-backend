const mongoose = require("mongoose");

// const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, "The username field is required"],
  },

  email: {
    type: String,
    required: [true, "The email field is required"],
    unique: true,
    // validate: {
    //   validator(value) {
    //     return validator.isEmail(value);
    //   },
    //   message: "You must enter a valid email",
    // },
  },
  password: {
    type: String,
    required: [true, "The password field is required"],
    select: false,
  },
  confirm: {
    type: String,
    required: [true, "The passwords must match"],
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
