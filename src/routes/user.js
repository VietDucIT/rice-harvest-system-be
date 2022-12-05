const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.get("/check-existed-phone", userController.checkPhone);
router.get("/:id", userController.show);
router.post("/login", userController.logIn);
router.post("/", userController.add);
router.put("/:id", userController.modify);
router.delete("/:id", userController.delete);
// router.get('/:slug', userController.show);

module.exports = router;
