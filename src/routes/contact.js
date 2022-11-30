const express = require("express");
const router = express.Router();

const contactController = require("../controllers/ContactController");

router.get("/user/:idUser", contactController.showList);
router.get("/find/:idUser", contactController.showListByName);
router.get("/:id", contactController.show);
router.post("/", contactController.add);
// router.put("/:id", contactController.modify);
router.delete("/:id", contactController.delete);
// router.get('/:slug', contactController.show);

module.exports = router;
