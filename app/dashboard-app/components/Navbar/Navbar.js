import './Navbar.css';
import Link from './Link';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function AppNavbar({ user }) {
  return (
<Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="justify-content-center text-center center-nav">
            {user && (
              <>
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
              <Link href="/login">
                <a className="nav-link">Sign in | Sign up</a>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}