import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AppDispatch, RootState } from '../app/store';
import { reset } from '../features/goals/goalsSlice';
import { createGoal } from '../features/goals/goalsThunks';

function GoalsForm() {
  const [text, setText] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const goalsState = useSelector((state: RootState) => state.goals);
  const { error, message } = goalsState;

  const onSubmitForm = (e: any) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
  };

  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    dispatch(reset());
  }, [error, message, dispatch]);

  return (
    <form className="form" onSubmit={onSubmitForm}>
      <div className="form-group">
        <label htmlFor="text">Goal</label>
        <input
          id="text"
          name="text"
          type="text"
          placeholder="Learn something new! 💡"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required={true}
        />
      </div>

      <button className="btn btn-block" type="submit">
        Add Goal
      </button>
    </form>
  );
}

export default GoalsForm;
