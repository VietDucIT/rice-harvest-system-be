const express = require("express");
const router = express.Router();

const connecttionController = require("../controllers/ConnectionController");

router.get("/user/:idUser", connecttionController.showList);
router.get("/find/:idUser", connecttionController.showListByName);
router.get("/:id", connecttionController.show);
router.post("/", connecttionController.add);
// router.put("/:id", connecttionController.modify);
router.delete("/:id", connecttionController.delete);
// router.get('/:slug', connecttionController.show);

module.exports = router;
