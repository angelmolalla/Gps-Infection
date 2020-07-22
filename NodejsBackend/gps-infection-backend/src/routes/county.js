const express = require("express");
const router = express.Router();
const county = require("../controller/county.controller");
const passport = require("passport");

router.get(
  "/county/:id",
  passport.authenticate("jwt", { session: false }),
  county.findId
);
router.get(
  "/county",
  passport.authenticate("jwt", { session: false }),
  county.findAll
);

router.post(
  "/county",
  passport.authenticate("jwt", { session: false }),
  county.create
);

router.put(
  "/county/:id",
  passport.authenticate("jwt", { session: false }),
  county.update
);

module.exports = router;
