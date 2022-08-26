const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");

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
  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await UserModel.create({
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
    token: generateToken(user._id),
  });
});

/**
 * @description Authenticate a User
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const user = await UserModel.findOne({ email });

  // Check if user exists and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

/**
 * @description Get User data
 * @route GET /api/users/me
 * @access Private
 */
const getUserData = asyncHandler(async (req, res) => {
  const { _id: id, name, email } = req.user;
  res.status(200).json({ id, name, email });
});

/**
 * Generate JWT Token
 *
 * @param {string} id User _id
 * @returns {string} JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
};
