const express = require("express");
const router = express.Router();

const traderController = require("../controllers/TraderController");

// ALL ROUTERS OF USER ???

router.get("/list-by-name", traderController.showByName);
// router.get('/:slug', traderController.show);

module.exports = router;
