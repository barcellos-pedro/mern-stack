const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", userController.getUserData);

module.exports = router;
