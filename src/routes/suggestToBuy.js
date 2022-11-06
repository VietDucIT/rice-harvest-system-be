const express = require("express");
const router = express.Router();

const suggestToBuyController = require("../controllers/SuggestToBuyController");

router.get("/:id", suggestToBuyController.show);
router.post("/", suggestToBuyController.add);
router.put("/:id", suggestToBuyController.modify);
router.delete("/:id", suggestToBuyController.delete);
router.get("/:idTrader/list", suggestToBuyController.showList);
router.get(
  "/:idRiceSeason/list-for-rice-season",
  suggestToBuyController.showListForRiceSeason
);
// router.get('/:slug', suggestToBuyController.show);

module.exports = router;
