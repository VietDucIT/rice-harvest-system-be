const express = require("express");
const router = express.Router();

const contactController = require("../controllers/ContactController");

router.get("/user/:idUser", contactController.showList);
router.get("/check/:idUser", contactController.checkIfContacted);
router.get("/find/:idUser", contactController.showListByName);
router.get("/:id", contactController.show);
router.post("/", contactController.add);
router.delete("/:id", contactController.delete);

module.exports = router;
