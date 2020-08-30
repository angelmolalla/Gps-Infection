const express = require("express");
const router = express.Router();
const registryDeath = require("../controller/registryDeath.controller");

router.get("/registryDeath", registryDeath.findAll);

module.exports = router;
