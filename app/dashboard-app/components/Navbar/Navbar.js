import './Navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';
import Link from './Link';

const AppNavbar = ({ user }) => (
  <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="justify-content-center text-center center-nav">
        {user && (
          <>
            <Nav.Item>
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/general">
                <a className="nav-link">General</a>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/sales">
                <a className="nav-link">Sales</a>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/purchases">
                <a className="nav-link">Purchases</a>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/finances">
                <a className="nav-link">Finances</a>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/logistics">
                <a className="nav-link">Logistics</a>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/logout">
                <a className="nav-link">Logout </a>
              </Link>
            </Nav.Item>
          </>
        )}
        {!user && (
        <>
          <Nav.Item>
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/login">
                <a className="nav-link">Login </a>
              </Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

AppNavbar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  children: PropTypes.node,
};

AppNavbar.defaultProps = {
  user: null,
  children: null,
};

export default AppNavbar;
