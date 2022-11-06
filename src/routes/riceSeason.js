const express = require("express");
const router = express.Router();

const riceSeasonController = require("../controllers/RiceSeasonController");

router.get("/:id", riceSeasonController.show);
router.post("/", riceSeasonController.add);
router.put("/:id", riceSeasonController.modify);
router.delete("/:id", riceSeasonController.delete);
router.get("/:idFarmer/list", riceSeasonController.showList);
// router.get('/:slug', riceSeasonController.show);

module.exports = router;
