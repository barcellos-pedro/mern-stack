// Middleware for handling exceptions inside of
// async express routes and passing them to your express error handlers.
const asyncHandler = require("express-async-handler");
const GoalModel = require("../models/goalModel");
const UserModel = require("../models/userModel");

/**
 * @description Get User Goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
  // Access User data passed from auth middleware
  const loggedUserId = req.user.id;

  // Find Goals by User ID
  const goals = await GoalModel.find({ user: loggedUserId });
  res.status(200).json(goals);
});

/**
 * @description Set Goal
 * @route POST /api/goals
 * @access Private
 */
const setGoal = asyncHandler(async (req, res) => {
  const text = req.body.text;

  if (!text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  // Access User data passed from auth middleware
  const loggedUserId = req.user.id;
  const newGoal = await GoalModel.create({
    text,
    user: loggedUserId,
  });

  res.status(200).json(newGoal);
});

/**
 * @description Update Goal
 * @route PUT /api/goals/:id
 * @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const goal = await GoalModel.findById(goalId);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const loggedUserId = req.user.id;

  // Make sure logged users only update their own goals
  // Goal user is mongo ObjectId (check GoalModel)
  if (goal.user.toString() !== loggedUserId) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const { text } = req.body;

  const updatedGoal = await GoalModel.findByIdAndUpdate(
    goalId,
    {
      text,
      user: loggedUserId,
    },
    { new: true } // Create if it doesn't exists
  );

  res.status(200).json(updatedGoal);
});

/**
 * @description Delete Goal
 * @route DELETE /api/goals/:id
 * @access Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const goal = await GoalModel.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  const loggedUserId = req.user.id;

  // Make sure logged users only delete their own goals
  if (goal.user.toString() !== loggedUserId) {
    res.status(400);
    throw new Error("User not authorized");
  }

  await GoalModel.findByIdAndDelete(id);
  res.status(200).json({ id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
