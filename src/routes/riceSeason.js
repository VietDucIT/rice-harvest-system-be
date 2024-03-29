const express = require("express");
const router = express.Router();

const riceSeasonController = require("../controllers/RiceSeasonController");

router.get("/find-by-name", riceSeasonController.findByName);
router.get("/farmer/:idFarmer", riceSeasonController.showList);
router.get(
  "/current-status/:idRiceField",
  riceSeasonController.getCurrentStatus
);
router.get("/:id", riceSeasonController.showOne);
router.post("/", riceSeasonController.add);
router.put("/:id", riceSeasonController.modify);
router.delete("/:id", riceSeasonController.delete);

module.exports = router;
