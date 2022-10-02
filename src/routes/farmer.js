const express = require("express");
const router = express.Router();

const farmerController = require("../controllers/FarmerController");

router.get("/list-by-name", farmerController.showByName);
router.get("/list-by-address", farmerController.showByAddress);
// router.get('/:slug', farmerController.show);

module.exports = router;
