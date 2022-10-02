const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.get("/:idOwner/manage-houses", userController.manageHouses);
router.get("/:idOwner/manage-posts", userController.managePosts);

module.exports = router;
