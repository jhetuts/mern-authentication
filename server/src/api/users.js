const { Router, request } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const {
  validateLoginInput,
  validateRegisterInput,
} = require("../validations/users");
const User = require("../models/UserSchema");

const router = new Router();

//Register
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(errors, isValid);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email is already exist";
      return res.status(409).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          }

          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.status(200).json(user))
            .catch((error) => {
              return res.status(500).json({
                error: error,
              });
            });
        });
      });
    }
  });
});

//Login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
        };

        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              return res.status(500).json(err);
            }
            res.json({
              message: "Success",
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        errors.password = "Password is incorrect";
        return res.status(409).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
