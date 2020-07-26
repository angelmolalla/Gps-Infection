const express = require("express");
const router = express.Router();
const county = require("../controller/county.controller");
const passport = require("passport");

router.get("/county/:id", county.findId);

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

router.put(
  "/county/changeTrafficLightGovernmentCounty/:id",
  passport.authenticate("jwt", { session: false }),
  county.changeTrafficLightGovernmentCounty
);
module.exports = router;
