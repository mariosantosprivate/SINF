// Importing a local CSS file.
import './Header.css';
import { Navbar, Nav, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from './Link';

const Header = (props) => (
  <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="justify-content-center text-center center-nav">
        <Nav.Item>
          <Link href="/">
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
      </Nav>
    </Navbar.Collapse>
    {props.children}
  </Navbar>
);

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;
