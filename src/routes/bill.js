const express = require("express");
const router = express.Router();

const billController = require("../controllers/BillController");

router.get("/user/:idUser", billController.showList);
router.get("/farmer/:idFarmer", billController.showListForFarmer);
router.get("/trader/:idTrader", billController.showListForTrader);
router.get("/rice-season/:idRiceSeason", billController.showListForRiceSeason);
router.get("/:id", billController.show);
router.post("/", billController.add);
router.put("/:id", billController.modify);
// router.get('/:slug', billController.show);

module.exports = router;
