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
router.post("/register", (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(errors, isValid);

  if (!isValid) {
    res.status(400);
    return next({
      message: errors,
    });
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email is already exist";
      res.status(400);
      return next({
        message: errors,
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          res.status(500);
          return next({
            message: err,
          });
        }

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            res.status(500);
            return next({
              message: err,
            });
          }

          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.status(200).json(user))
            .catch((error) => {
              res.status(500);
              return next({
                message: error,
              });
            });
        });
      });
    }
  });
});

//Login
router.post("/login", (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400);
    return next({
      message: errors,
    });
  }

  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      res.status(400);
      return next({
        message: errors,
      });
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
              res.status(500);
              return next({
                message: err,
              });
            }
            res.json({
              message: "Success",
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        errors.password = "Password is incorrect";
        res.status(400);
        return next({
          message: errors,
        });
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
