import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../app/store';
import GoalsList from '../components/GoalsList';

import Spinner from '../components/Spinner';
import { reset } from '../features/goals/goalsSlice';
import { getGoals } from '../features/goals/goalsThunks';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const rootState = useSelector((state: RootState) => state);
  const { user } = rootState.auth;
  const { goals, error, loading, message } = rootState.goals;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (user) {
      dispatch(getGoals(user.token));
    }

    if (error) {
      toast.error(message);
    }

    dispatch(reset());
  }, [navigate, user, dispatch, error, message]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {user && `${user.name}`}</h2>
      <section className="content">
        <GoalsList list={goals} />
      </section>
    </div>
  );
}

export default Dashboard;
