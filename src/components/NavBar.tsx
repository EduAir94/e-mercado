import { Link, Navigate } from 'react-router-dom';
import { RouteInterface } from '../routes/types';
import { withRouter } from '../routes/WithRouter';
import AuthService from '../services/authService';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';

function NavBar({ router }: { router: RouteInterface }) {
  const logout = () => {
    AuthService.logout();
    router.navigate('/login');
  };

  const user = AuthService.user();
  return (
    <Navbar bg="dark" expand="lg" className="navbar-dark p-1">
      <div className="container">
        <Navbar.Toggle
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          aria-controls="navbarNav"
        />
        <Navbar.Collapse id="navbarNav">
          <ul className="navbar-nav w-100 justify-content-between">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Categorías
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sell">
                Vender
              </Link>
            </li>
            <NavDropdown title={user.email} id="basic-nav-dropdown">
              <Link className="dropdown-item" to="/my-profile">
                Profile
              </Link>
              <a onClick={logout} className="dropdown-item" href="#">
                Logout
              </a>
            </NavDropdown>
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default withRouter(NavBar);
