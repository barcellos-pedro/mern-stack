import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset } from '../features/auth/authSlice';
import { AuthState } from '../types/AuthState';

/**
 * Watch authentication flow.
 *
 * On User Login/Register
 */
export function useWatchAuthentication() {
  // Use to navigate to other routes
  const navigate = useNavigate();

  // Dispatch store actions
  const dispatch = useDispatch<any>();

  // Grab auth state fields
  const { user, loading, error, message } = useSelector(
    (state: any) => state.auth as AuthState
  );

  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    if (user) {
      navigate('/');
    }

    dispatch(reset());
  }, [error, message, user, dispatch, navigate]);

  return { loading, dispatch };
}
