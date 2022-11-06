const express = require("express");
const router = express.Router();

const ricePriceController = require("../controllers/RicePriceController");

router.get("/", ricePriceController.show);
router.get("/prediction", ricePriceController.predict);
router.get("/check", ricePriceController.checkToUpdate);
router.put("/update", ricePriceController.update);
// router.get("/update-old-price", ricePriceController.updateOldPrice);
// router.get("/sort-posts", ricePriceController.sortPorts);
// router.get("/count-document", ricePriceController.count);
// router.get('/:slug', ricePriceController.show);

module.exports = router;
