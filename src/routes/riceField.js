const express = require("express");
const router = express.Router();

const riceFieldController = require("../controllers/RiceFieldController");

router.get("/:id", riceFieldController.show);
router.post("/", riceFieldController.add);
router.put("/:id", riceFieldController.modify);
router.delete("/:id", riceFieldController.delete);
router.get("/:id/list", riceFieldController.showList);
// router.get('/:slug', riceFieldController.show);

module.exports = router;
