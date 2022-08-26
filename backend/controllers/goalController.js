// Middleware for handling exceptions inside of
// async express routes and passing them to your express error handlers.
const asyncHandler = require("express-async-handler");
const GoalModel = require("../models/goalModel");

/**
 * @description Get User Goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await GoalModel.find({ user: req.user.id });
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
  const id = req.params.id;
  const goal = await GoalModel.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  const updatedGoal = await GoalModel.findByIdAndUpdate(
    id,
    req.body,
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

  await GoalModel.findByIdAndDelete(id);
  res.status(200).json({ id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
