const express = require("express");
const router = express.Router();

const riceController = require("../controllers/RiceController");

// Params ???
router.get("/", riceController.showList);
// router.get('/:slug', riceController.show);

module.exports = router;
