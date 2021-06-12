const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
var passport = require("passport");
// Passport Config
require("./config/passport")(passport);
const { ensureAuthenticated, forwardAuthenticated } = require("./config/auth");
const User = require("./models/User");
const app = express();
app.use(express.json());
app.use(passport.initialize());
// TURN OFF IN PRODUCTION
const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
// Connect to MongoDB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.post("/login", passport.authenticate("local"), (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    res.send({ token: user.id });
  });
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password, password2 } = req.body;
  let errors = [];

  if (!email || !password || !password2) {
    errors.push({ error: "Please enter all fields" });
  }

  if (password !== password2) {
    errors.push({ error: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ error: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.send({
      errors,
      firstName,
      lastName,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ error: "Email already exists" });
        res.send(errors);
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.send(user);
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

app.post("/account", (req, res) => {
  User.findOne({ _id: req.body.token }).then((user) => {
    if (!user) {
      res.send("Account not found. Sign in to continue!");
    } else {
      res.send(user);
    }
  });
});

app.listen(8080, () => console.log("API is running on http://localhost:8080"));
