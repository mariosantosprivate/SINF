// Importing a local CSS file.
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import Link from './Link';

const Header = () => (
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
  </Navbar>
);
export default Header;
