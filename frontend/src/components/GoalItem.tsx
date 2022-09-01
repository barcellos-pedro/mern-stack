// import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../app/store';
import { reset } from '../features/goals/goalsSlice';
import { deleteGoal } from '../features/goals/goalsThunks';
import { Goal } from '../types/Goal';

type GoalItemProps = {
  goal: Goal;
};

function GoalItem({ goal }: GoalItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const goalsState = useSelector((state: RootState) => state.goals);
  const { error, message } = goalsState;

  // Helper to show parsed date
  const getGoalDate = ({ createdAt }: Goal) =>
    new Date(createdAt).toLocaleString();

  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    dispatch(reset());
  }, [error, message, dispatch]);

  return (
    <div className="goal">
      <div>{getGoalDate(goal)}</div>
      <h2>{goal.text}</h2>
      <button
        title="Delete Goal"
        className="close"
        onClick={() => dispatch(deleteGoal(goal._id))}
      >
        X
      </button>
    </div>
  );
}

export default GoalItem;
