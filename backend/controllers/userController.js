const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const UserlModel = require("../models/userModel");

/**
 * @description Register new User
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Find user by email and check if exists
  const userExists = await UserlModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await UserlModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid User data");
  }

  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
  });
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
