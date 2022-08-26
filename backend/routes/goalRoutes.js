const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");
const authGuard = require("../middlewares/authMiddleware");

/**
 * Same as
 * router.get("/", goalController.getGoals);
 * router.post("/", goalController.setGoals);
 */
router
  .route("/")
  .get(authGuard, goalController.getGoals)
  .post(authGuard, goalController.setGoal);

router
  .route("/:id")
  .delete(authGuard, goalController.deleteGoal)
  .put(authGuard, goalController.updateGoal);

module.exports = router;
