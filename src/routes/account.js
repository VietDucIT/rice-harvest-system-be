const express = require("express");
const router = express.Router();

const accountController = require("../controllers/AccountController");

router.get("/:id", accountController.show);
router.post("/", accountController.add);
router.post("/:id/modify", accountController.modify);
router.post("/:id/delete", accountController.delete);
router.post("/login", accountController.logIn);
// router.get('/:slug', accountController.show);

module.exports = router;
