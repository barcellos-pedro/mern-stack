/**
 * @description Get Goals
 * @route GET /api/goals
 * @access Private
 */
function getGoals(req, res) {
  res.status(200).json({ message: "Get goals" });
}

/**
 * @description Set Goal
 * @route POST /api/goals
 * @access Private
 */
function setGoal(req, res) {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: `Set goal: ${req.body.text}` });
}

/**
 * @description Update Goal
 * @route PUT /api/goals/:id
 * @access Private
 */
function updateGoal(req, res) {
  res.status(200).json({ message: `Update goal with id: ${req.params.id}` });
}

/**
 * @description Delete Goal
 * @route DELETE /api/goals/:id
 * @access Private
 */
function deleteGoal(req, res) {
  res.status(200).json({ message: `Delete goal with id: ${req.params.id}` });
}

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
