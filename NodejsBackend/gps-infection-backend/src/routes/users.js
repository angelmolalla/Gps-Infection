const express = require("express");
const router = express.Router();
const user = require("../controller/user.controller");
const passport = require("passport");
const utils = require("../config/utils");
const User = require("../model/users.model");

router.post("/users/signup", user.create);

router.post("/users/login", function (req, res, next) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, msg: "could not find user" });
      }

      // Function defined at bottom of app.js
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/users", passport.authenticate('jwt', { session: false }), user.findAll);
router.get("/users/:email", user.findByEmail);
module.exports = router;
