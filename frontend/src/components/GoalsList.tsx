import { Goal } from '../types/Goal';
import GoalItem from './GoalItem';

type GoalsListProps = {
  list: Goal[];
};

function GoalsList({ list }: GoalsListProps) {
  return (
    <div className="goals">
      {list.map((goal) => (
        <GoalItem key={goal._id} goal={goal} />
      ))}
    </div>
  );
}

export default GoalsList;
