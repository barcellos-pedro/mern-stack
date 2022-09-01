// import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaTrashAlt, FaPenAlt } from 'react-icons/fa';

import { AppDispatch, RootState } from '../app/store';
import { reset } from '../features/goals/goalsSlice';
import { deleteGoal, updateGoal } from '../features/goals/goalsThunks';
import { Goal } from '../types/Goal';
import GoalItemForm from './GoalItemForm';

type GoalItemProps = {
  goal: Goal;
};

function GoalItem({ goal }: GoalItemProps) {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const goalsState = useSelector((state: RootState) => state.goals);
  const { error, message } = goalsState;

  // Helper to show parsed date
  const getGoalDate = ({ createdAt }: Goal) =>
    new Date(createdAt).toLocaleString();

  const onSubmit = (event: any) => {
    event.preventDefault();
    dispatch(updateGoal({ text, id: goal._id }));
  };

  const onInputChange = (event: any) => {
    setText(event.target.value);
  };

  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    dispatch(reset());
  }, [error, message, dispatch]);

  return (
    <div className="goal">
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {getGoalDate(goal)}
        <button
          style={{ border: 'none', background: 'transparent' }}
          title="Update Goal"
          aria-label="Update Goal"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPenAlt />
        </button>
        <button
          style={{ border: 'none', background: 'transparent' }}
          title="Delete Goal"
          aria-label="Delete Goal"
          onClick={() => dispatch(deleteGoal(goal._id))}
        >
          <FaTrashAlt />
        </button>
      </div>

      <h2>{goal.text}</h2>

      {/* Goal item form */}
      {showForm && (
        <GoalItemForm
          onSubmitForm={onSubmit}
          onInputChange={onInputChange}
          value={text}
        />
      )}
    </div>
  );
}

export default GoalItem;

const style = {};
