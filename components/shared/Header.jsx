import React, { useState } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { isAuthorized } from "../../utils/auth0";
import ReactResizeDetector from "react-resize-detector";
import ActiveLink from "../shared/ActiveLink";

const BsNavLink = (props) => {
  const { href, title, className = "" } = props;
  return (
    <ActiveLink activeClassName="active" href={href}>
      <a className={`${className} nav-link port-navbar-link`}>{title}</a>
    </ActiveLink>
  );
};

const LoginLink = () => (
  <a href="/api/v1/login" className="nav-link port-navbar-link clickable">
    Login
  </a>
);
const LogoutLink = () => (
  <a href="/api/v1/logout" className="nav-link port-navbar-link clickable">
    Logout
  </a>
);

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
    >
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        Admin
      </DropdownToggle>
      <DropdownMenu left={true}>
        <DropdownItem>
          <BsNavLink
            href="/portfolios/new"
            title="Create Portfolio"
            className="port-dropdown-item"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            href="/blogs/editor"
            title="Blog Editor"
            className="port-dropdown-item"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            href="/dashboard"
            title="Dashboard"
            className="port-dropdown-item"
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const Header = ({ user, loading, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <Navbar
          className={`port-navbar port-default absolute ${className} ${
            width < 682 && isOpen ? "is-open" : "is-close"
          }`}
          dark
          expand="md"
        >
          <div className="navbar-brand">
            <Link href="/">
              <a className="port-navbar-brand">Deep Shah</a>
            </Link>
          </div>
          <NavbarToggler onClick={toggle} />

          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/" title="Home" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/about" title="About" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/portfolios" title="Portfolios" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/blogs" title="Blogs" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/cv" title="Cv" />
              </NavItem>
              {/* <NavItem className="port-navbar-item">
              <BsNavLink href="/secret" title="Secret" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/admin" title="Admin" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/secretssr" title="SecretSsr" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/adminssr" title="AdminSsr" />
            </NavItem> */}
            </Nav>
            <Nav navbar>
              {!loading && (
                <>
                  {user && (
                    <>
                      {isAuthorized(user, "admin") && <AdminMenu />}
                      <NavItem className="port-navbar-item">
                        <LogoutLink />
                      </NavItem>
                    </>
                  )}
                  {!user && (
                    <NavItem className="port-navbar-item">
                      <LoginLink />
                    </NavItem>
                  )}
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </ReactResizeDetector>
  );
};

export default Header;
