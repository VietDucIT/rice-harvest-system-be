const express = require("express");
const router = express.Router();

const riceBuyingAreaController = require("../controllers/RiceBuyingAreaController");

router.get("/:id", riceBuyingAreaController.show);
router.post("/", riceBuyingAreaController.add);
router.post("/:id/modify", riceBuyingAreaController.modify);
router.post("/:id/delete", riceBuyingAreaController.delete);
router.get("/:id/list", riceBuyingAreaController.showList);
// router.get('/:slug', riceBuyingAreaController.show);

module.exports = router;
