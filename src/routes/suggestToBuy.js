const express = require("express");
const router = express.Router();

const suggestToBuyController = require("../controllers/SuggestToBuyController");

router.get("/trader/:idTrader", suggestToBuyController.showList);
router.get("/farmer", suggestToBuyController.findByFarmerName);
router.get(
  "/season/:idRiceSeason",
  suggestToBuyController.showListForRiceSeason
);
router.get("/:id", suggestToBuyController.show);
router.post("/", suggestToBuyController.add);
router.put("/:id", suggestToBuyController.modify);
router.delete("/:id", suggestToBuyController.delete);

module.exports = router;
