const express = require("express");
const router = express.Router();
const registryPositive = require("../controller/registryPositive.controller");

router.get("/registryPositive", registryPositive.findAll);

module.exports = router;
