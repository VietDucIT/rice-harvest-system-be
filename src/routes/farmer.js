const express = require("express");
const router = express.Router();

const farmerController = require("../controllers/FarmerController");

// INHERITED ALL ROUTERS OF USER ???

router.get("/find-by-name", farmerController.findByName);
router.get("/find-by-address", farmerController.findByAddress);
// router.get('/:slug', farmerController.show);

module.exports = router;
