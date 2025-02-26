import { Button, Navbar, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../features/auth/authSlice';

const AuthButton = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    navigate('/login', { state: { from: location } });
  };

  return loggedIn ? <Button onClick={handleClick}>Log out</Button> : <></>;
};

const Header = () => {
  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default Header;
