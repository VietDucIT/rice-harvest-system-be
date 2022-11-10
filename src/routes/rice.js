const express = require("express");
const router = express.Router();

const riceController = require("../controllers/RiceController");

router.get("/", riceController.showList);
// router.put("/update", riceController.update);
// router.get('/:slug', riceController.show);

module.exports = router;
