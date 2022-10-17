const express = require("express");
const router = express.Router();

const riceController = require("../controllers/RiceController");

router.get("/price", riceController.show);
router.get("/rice-list", riceController.showList);
// router.get('/:slug', riceController.show);

module.exports = router;
