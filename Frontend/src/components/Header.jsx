import { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, handleLogout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Navbar bg="primary" data-bs-theme="dark" className='justify-content-between'>
        <Container >
          <Navbar.Brand href="/">
            {user.isAdmin ? 'Admin Panel' : 'Assignment App'}
            &nbsp; &nbsp;
            <Navbar.Text style={{ color: 'white', fontSize: '14px'}}>
              {isLoggedIn ? `  ${user.firstName} ${user.lastName}` : null}
            </Navbar.Text>
          </Navbar.Brand>
        </Container>
        <Nav className="me-auto">
            {isLoggedIn ? <Button onClick={() => {
              handleLogout();
              navigate('/');
            
            }}>Logout</Button> : null}
        </Nav>
      </Navbar>
  )
}

export default Header;
