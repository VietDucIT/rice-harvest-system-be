const express = require("express");
const router = express.Router();

const connecttionController = require("../controllers/ConnectionController");

router.get("/:id", connecttionController.show);
router.post("/", connecttionController.add);
router.post("/:id/modify", connecttionController.modify);
router.post("/:id/delete", connecttionController.delete);
// router.get("/:id/list", connecttionController.showList);
// router.get(
//   "/:id/list-for-rice-season",
//   connecttionController.showListForRiceSeason
// );
// router.get('/:slug', connecttionController.show);

module.exports = router;
