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

  if (!authorization) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  // Chech if there is data in authorization header to get the token
  if (authorization.startsWith("Bearer")) {
    try {
      // Get token from header (Bearer <token>)
      token = authorization.split(" ").at(-1);

      // Verify token
      const decoded = jwt.verify(token, SECRET);

      // Get User by Id
      // from the decoded token and assign to Request object
      // Remove the password field from the query
      req.user = await UserModel.findById(decoded.id).select("-password");

      // Continue request/response lifecycle
      // calling next middleware
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
});

module.exports = protect;
