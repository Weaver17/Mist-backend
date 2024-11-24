const User = require("../models/user");

// POST user
const createUser = (req, res) => {
  const { username, email, password, confirm } = req.body;
  User.create({ username, email, password, confirm })
    .then((user) => res.status(201).send(user))
    .catch((e) => {
      console.error(e);

      res.status(500).send("Error on the server");
    });
};

// SIGN IN
// const login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return new Error("Incorrect email or password");
//   }

//   if (!validator.isEmail(email)) {
//     throw new Error("Invalid Email");
//   }

//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
//         expiresIn: "7d",
//       });

//       return res.send({ token });
//     })
//     .catch((e) => {
//       console.error(e);
//       if (e.message === "Incorrect email or password") {
//         return new Error("Incorrect email or password");
//       }
//       return e;
//     });
// };

module.exports = {
  createUser,
  //   login,
};
