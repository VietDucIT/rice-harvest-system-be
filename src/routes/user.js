const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

// router.get("/", userController.haha);
router.get("/:id", userController.show);
router.post("/", userController.add);
router.post("/:id/modify", userController.modify);
router.post("/:id/delete", userController.delete);
router.post("/login", userController.logIn);
// router.get('/:slug', userController.show);

module.exports = router;
