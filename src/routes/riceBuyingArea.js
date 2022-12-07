const express = require("express");
const router = express.Router();

const riceBuyingAreaController = require("../controllers/RiceBuyingAreaController");

router.get("/find-by-name", riceBuyingAreaController.findByName);
router.get("/trader/:idTrader", riceBuyingAreaController.showList);
router.get("/:id", riceBuyingAreaController.showOne);
router.post("/", riceBuyingAreaController.add);
router.put("/:id", riceBuyingAreaController.modify);
router.delete("/:id", riceBuyingAreaController.delete);

module.exports = router;
