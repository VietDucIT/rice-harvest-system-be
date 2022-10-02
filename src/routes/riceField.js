const express = require("express");
const router = express.Router();

const riceFieldController = require("../controllers/RiceFieldController");

router.get("/:id", riceFieldController.show);
router.post("/", riceFieldController.add);
router.post("/:id/modify", riceFieldController.modify);
router.post("/:id/delete", riceFieldController.delete);
router.get("/:id/list", riceFieldController.showList);
// router.get('/:slug', riceFieldController.show);

module.exports = router;
