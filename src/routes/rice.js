const express = require("express");
const router = express.Router();

const riceController = require("../controllers/RiceController");

router.get("/", riceController.showList);
router.put("/update", riceController.update);

module.exports = router;
