const express = require("express");
const router = express.Router();

const suggestToBuyController = require("../controllers/SuggestToBuyController");

router.get("/:id", suggestToBuyController.show);
router.post("/", suggestToBuyController.add);
router.post("/:id/modify", suggestToBuyController.modify);
router.post("/:id/delete", suggestToBuyController.delete);
router.get("/:id/list", suggestToBuyController.showList);
router.get(
  "/:id/list-for-rice-season",
  suggestToBuyController.showListForRiceSeason
);
// router.get('/:slug', suggestToBuyController.show);

module.exports = router;
