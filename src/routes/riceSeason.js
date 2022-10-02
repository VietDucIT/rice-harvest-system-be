const express = require("express");
const router = express.Router();

const riceSeasonController = require("../controllers/RiceSeasonController");

router.get("/:id", riceSeasonController.show);
router.post("/", riceSeasonController.add);
router.post("/:id/modify", riceSeasonController.modify);
router.post("/:id/delete", riceSeasonController.delete);
router.get("/:id/list", riceSeasonController.showList);
// router.get('/:slug', riceSeasonController.show);

module.exports = router;
