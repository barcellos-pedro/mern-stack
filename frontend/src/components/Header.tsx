import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Goals</Link>
      </div>

      <div>
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
      </div>
    </header>
  );
}

export default Header;
