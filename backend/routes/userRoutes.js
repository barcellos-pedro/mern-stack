const express = require("express");
const router = express.Router();
const authGuard = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", authGuard, userController.getUserData);

module.exports = router;
