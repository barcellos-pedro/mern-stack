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
    throw new Error("Not authorized. Authorization Header empty.");
  }

  // Check if authorization header is an Bearer Token
  if (!authorization.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Invalid token format. Make sure to use: Bearer <token>");
  }

  // Try to get token and verify it
  try {
    // Get token from header (Bearer <token>)
    token = authorization.split(" ").at(-1);

    // Verify token and assign to decoded token variable
    const decoded = jwt.verify(token, SECRET);

    // Get User by Id (ID from JWT sign on Login/Register)
    // Remove the password field from the query
    const loggedInUser = await UserModel.findById(decoded.id).select(
      "-password"
    );

    if (!loggedInUser) {
      res.status(401);
      throw new Error("User not found");
    }

    // Put User data inside request object
    // so we can use User data on subsequent private routes
    req.user = loggedInUser;

    // Continue request/response lifecycle
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = protect;
