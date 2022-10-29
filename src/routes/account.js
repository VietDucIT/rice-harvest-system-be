const express = require("express");
const router = express.Router();

const accountController = require("../controllers/AccountController");

router.get("/:id", accountController.show);
router.post("/", accountController.add);
router.put("/:id", accountController.modify);
router.delete("/:id", accountController.delete);
router.post("/login", accountController.logIn);
// router.get('/:slug', accountController.show);

module.exports = router;
