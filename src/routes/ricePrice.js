const express = require("express");
const router = express.Router();

const ricePriceController = require("../controllers/RicePriceController");

router.get("/prediction", ricePriceController.predict);
router.get("/check", ricePriceController.checkToUpdate);
// router.get("/add-old-posts", ricePriceController.addOldPosts);
// router.get("/add-old-prices", ricePriceController.addOldPrices);
router.get("/", ricePriceController.show);
router.put("/update", ricePriceController.update);

module.exports = router;
