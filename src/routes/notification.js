const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/NotificationController");

router.get("/user/:idUser", notificationController.showList);
router.get("/:id", notificationController.show);
router.post("/", notificationController.add);
router.put("/:id", notificationController.modify);
router.delete("/:id", notificationController.delete);
// router.get('/:slug', notificationController.show);

module.exports = router;
