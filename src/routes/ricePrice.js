const express = require("express");
const router = express.Router();

const ricePriceController = require("../controllers/RicePriceController");

router.get("/rice-price", ricePriceController.show);
// ???
// router.post("/rice-price", ricePriceController.add);
// router.get('/:slug', ricePriceController.show);

module.exports = router;
