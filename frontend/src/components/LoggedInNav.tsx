import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

function LoggedInNav() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li>
          <button className="btn" onClick={onLogOut}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default LoggedInNav;
