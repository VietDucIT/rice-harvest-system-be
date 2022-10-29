const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.get("/:id", userController.show);
router.get("/checkUniquePhone", userController.checkPhone);
router.post("/", userController.add);
router.put("/:id", userController.modify);
router.delete("/:id", userController.delete);
router.post("/login", userController.logIn);
// router.get('/:slug', userController.show);

module.exports = router;
