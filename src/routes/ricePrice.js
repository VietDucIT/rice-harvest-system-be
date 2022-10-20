const express = require("express");
const router = express.Router();

const ricePriceController = require("../controllers/RicePriceController");

router.get("/", ricePriceController.show);
// router.get('/:slug', ricePriceController.show);

module.exports = router;
