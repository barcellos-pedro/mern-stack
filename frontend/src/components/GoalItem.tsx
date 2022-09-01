// import { useDispatch } from 'react-redux';
import { Goal } from '../types/Goal';

type GoalItemProps = {
  goal: Goal;
};

function GoalItem({ goal }: GoalItemProps) {
  // const dispatch = useDispatch<any>();
  const getGoalDate = ({ createdAt }: Goal) =>
    new Date(createdAt).toLocaleString();

  return (
    <div className="goal">
      <div>{getGoalDate(goal)}</div>
      <h2>{goal.text}</h2>
      {/* TODO: Delete Goal */}
      <button
        title="Delete Goal"
        className="close"
        onClick={() => console.log('delete goal')}
      >
        X
      </button>
    </div>
  );
}

export default GoalItem;
