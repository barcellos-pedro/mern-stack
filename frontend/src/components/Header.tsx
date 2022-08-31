import { Link } from 'react-router-dom';
import DefaultNav from './DefaultNav';
import LoggedInNav from './LoggedInNav';

type HeaderProps = {
  isUserLogged: boolean;
};

function Header({ isUserLogged }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Goals</Link>
      </div>
      {isUserLogged ? <LoggedInNav /> : <DefaultNav />}
    </header>
  );
}

export default Header;
