const express = require("express");
const router = express.Router();
const { getPlatformStats } = require("../controllers/Stats");

router.get("/platformStats", getPlatformStats);

module.exports = router;
