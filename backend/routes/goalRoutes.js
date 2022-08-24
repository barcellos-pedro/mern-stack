const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");

/**
 * Same as
 * router.get("/", goalController.getGoals);
 * router.post("/", goalController.setGoals);
 */
router.route("/")
    .get(goalController.getGoals)
    .post(goalController.setGoal);

router.route("/:id")
  .delete(goalController.deleteGoal)
  .put(goalController.updateGoal);

module.exports = router;
