const express = require("express");
const router = express.Router();

const ricePriceController = require("../controllers/RicePriceController");

router.get("/prediction", ricePriceController.predict);
router.get("/check", ricePriceController.checkToUpdate);
router.get("/", ricePriceController.show);
router.put("/update", ricePriceController.update);
// router.get('/:slug', ricePriceController.show);

module.exports = router;
