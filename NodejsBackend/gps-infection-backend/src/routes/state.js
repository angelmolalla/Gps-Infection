const express = require("express");
const router = express.Router();
const state = require("../controller/state.controller");
const passport = require("passport");

router.get("/state/:id", state.findId);
router.get("/states", state.findAll);

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

router.post(
  "/state/sendReportPositive",
  passport.authenticate("jwt", { session: false }),
  state.sendReportPositive
);

router.post(
  "/state/sendReportDeath",
  passport.authenticate("jwt", { session: false }),
  state.sendReportDeath
);

module.exports = router;
