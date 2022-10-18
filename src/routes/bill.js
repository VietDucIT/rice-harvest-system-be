const express = require("express");
const router = express.Router();

const billController = require("../controllers/BillController");

router.get("/:id", billController.show);
router.post("/", billController.add);
router.post("/:id/modify", billController.modify);
router.post("/:id/delete", billController.delete);
// router.get("/:id/list", billController.showList);
// router.get(
//   "/:id/list-for-rice-season",
//   billController.showListForRiceSeason
// );
// router.get('/:slug', billController.show);

module.exports = router;
