import React, { Component } from "react";
import Link from "next/link";
import "./Navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <nav>
        <div>
          <Link href="/">
            <a title="Our API">Home</a>
          </Link>
          <Link href="/sales">
            <a title="Dashboard - Sales">Sales</a>
          </Link>
          <Link href="/purchases">
            <a title="Dashboard - Purchases">Purchases</a>
          </Link>
          <Link href="/finances">
            <a title="Dashboard - Finances">Finances</a>
          </Link>
          <Link href="/logistics">
            <a title="Dashboard - Logistics">Logistics</a>
          </Link>
          <mark className="badge"></mark>
        </div>
      </nav>
    );
  }
}

export default Navbar;
