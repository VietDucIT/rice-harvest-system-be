const express = require("express");
const router = express.Router();

const billController = require("../controllers/BillController");

router.get("/:id", billController.show);
router.post("/", billController.add);
router.put("/:id", billController.modify);
router.get("/:idUser/list", billController.showList);
// router.get(
//   "/:idRiceSeason/list-for-rice-season",
//   billController.showListForRiceSeason
// );
// router.get('/:slug', billController.show);

module.exports = router;
