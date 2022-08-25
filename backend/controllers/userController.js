const asyncHandler = require("express-async-handler");
const UserlModel = require("../models/userModel");

/**
 * @description Register new User
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "Register User" });
});

/**
 * @description Authenticate a User
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Logged In" });
});

/**
 * @description Get User data
 * @route GET /api/users/me
 * @access Public
 */
const getUserData = asyncHandler(async (req, res) => {
  res.json({ message: "User Data" });
});

module.exports = {
  registerUser,
  loginUser,
  getUserData,
};
