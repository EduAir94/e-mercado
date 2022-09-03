import { Link, Navigate } from 'react-router-dom';
import { RouteInterface } from '../routes/types';
import { withRouter } from '../routes/WithRouter';
import AuthService from '../services/authService';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar({ router }: { router: RouteInterface }) {
  const logout = () => {
    AuthService.logout();
    router.navigate('/login');
  };

  const user = AuthService.user();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-1">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
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
        </div>
      </div>
    </nav>
  );
}

export default withRouter(NavBar);
