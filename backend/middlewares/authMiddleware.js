const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const SECRET = process.env.JWT_SECRET;

/**
 * Route Guard Middleware
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  // Check if authorization header is empty
  if (!authorization) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  // Check if authorization header is an Bearer Token
  if (!authorization.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Invalid token format");
  }

  // Try to get token and verify it
  try {
    // Get token from header (Bearer <token>)
    token = authorization.split(" ").at(-1);

    // Verify token
    const decoded = jwt.verify(token, SECRET);

    // Get User by Id
    // from the decoded token and assign to Request object
    // Remove the password field from the query
    req.user = await UserModel.findById(decoded.id).select("-password");

    // Continue request/response lifecycle calling next middleware
    // with User data inside request object
    // so we can use User data inside private routes
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = protect;
