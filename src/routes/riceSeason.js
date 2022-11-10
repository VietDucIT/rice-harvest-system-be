const express = require("express");
const router = express.Router();

const riceSeasonController = require("../controllers/RiceSeasonController");

router.get("/farmer/:idFarmer", riceSeasonController.showList);
router.get("/find/:idFarmer", riceSeasonController.showListByName);
router.get("/:id", riceSeasonController.show);
router.post("/", riceSeasonController.add);
router.put("/:id", riceSeasonController.modify);
router.delete("/:id", riceSeasonController.delete);
// router.get('/:slug', riceSeasonController.show);

module.exports = router;
