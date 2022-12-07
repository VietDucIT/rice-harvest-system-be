const express = require("express");
const router = express.Router();

const farmerController = require("../controllers/FarmerController");

router.get("/find-by-name", farmerController.findByName);
router.get("/find-by-address", farmerController.findByAddress);

module.exports = router;
