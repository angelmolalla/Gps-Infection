const express = require("express");
const router = express.Router();
const user = require("../controller/user.controller");
const passport = require("passport");

router.post("/users/signup", user.create);
router.post("/users/login", user.login);
router.get("/users/verificationUser/:id", user.verificationUser);
router.get("/users", passport.authenticate('jwt', { session: false }), user.findAll);
router.get("/users/:email", passport.authenticate('jwt', { session: false }), user.findByEmail);
module.exports = router;
