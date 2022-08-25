// Middleware for handling exceptions inside of
// async express routes and passing them to your express error handlers.
const asyncHandler = require("express-async-handler");
const GoalModel = require("../models/goalModel");

/**
 * @description Get Goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await GoalModel.find();
  res.status(200).json(goals);
});

/**
 * @description Set Goal
 * @route POST /api/goals
 * @access Private
 */
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  
  const newGoal = await GoalModel.create({
    text: req.body.text,
  });
  res.status(200).json(newGoal);
});

/**
 * @description Update Goal
 * @route PUT /api/goals/:id
 * @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal with id: ${req.params.id}` });
});

/**
 * @description Delete Goal
 * @route DELETE /api/goals/:id
 * @access Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal with id: ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
