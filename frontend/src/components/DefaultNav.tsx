import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function DefaultNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Log in
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default DefaultNav;
