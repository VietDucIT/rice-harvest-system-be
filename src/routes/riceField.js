const express = require("express");
const router = express.Router();

const riceFieldController = require("../controllers/RiceFieldController");

router.get("/farmer/:idFarmer", riceFieldController.showList);
router.get("/:id", riceFieldController.showOne);
router.get("/", riceFieldController.showAll);
router.post("/", riceFieldController.add);
router.put("/:id", riceFieldController.modify);
router.delete("/:id", riceFieldController.delete);
// router.get('/:slug', riceFieldController.show);

module.exports = router;
