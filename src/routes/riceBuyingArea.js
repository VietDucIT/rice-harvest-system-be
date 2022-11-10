const express = require("express");
const router = express.Router();

const riceBuyingAreaController = require("../controllers/RiceBuyingAreaController");

router.get("/trader/:idTrader", riceBuyingAreaController.showList);
router.get("/:id", riceBuyingAreaController.show);
router.post("/", riceBuyingAreaController.add);
router.put("/:id", riceBuyingAreaController.modify);
router.delete("/:id", riceBuyingAreaController.delete);
// router.get('/:slug', riceBuyingAreaController.show);

module.exports = router;
