const express = require("express");
const router = express.Router();

const traderController = require("../controllers/TraderController");

router.get("/list-by-name", traderController.showByName);

module.exports = router;
