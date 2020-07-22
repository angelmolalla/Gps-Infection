const express = require("express");
const router = express.Router();
const state = require("../controller/state.controller");
const passport = require("passport");

router.get(
  "/state/:id",
  passport.authenticate("jwt", { session: false }),
  state.findId
);
router.get(
  "/state",
  passport.authenticate("jwt", { session: false }),
  state.findAll
);

router.post(
  "/state",
  passport.authenticate("jwt", { session: false }),
  state.create
);

router.put(
  "/state/:id",
  passport.authenticate("jwt", { session: false }),
  state.update
);

module.exports = router;
