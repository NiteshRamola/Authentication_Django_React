import React, { Fragment, useState, useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useLocation, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import validateUser from "./validateUser";
import {
  logout,
  googleAuthenticate,
  facebookAuthenticate,
} from "../Redux/actions/authActions";
import queryString from "query-string";

function Header() {
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userInfo = useSelector((state) => state.userInfo);
  const { user } = userInfo;
  const location = useLocation();
  const values = queryString.parse(location.search);
  const state = values.state ? values.state : null;
  const code = values.code ? values.code : null;
  const scope = values.scope ? String(values.scope) : null;

  let google = false;
  let facebook = false;

  if (scope !== null) {
    google = true;
  } else {
    facebook = true;
  }

  useEffect(() => {
    if (state && code && google) {
      dispatch(googleAuthenticate(state, code));
    } else if (state && code && facebook) {
      dispatch(facebookAuthenticate(state, code));
    } else {
      validateUser();
    }
  });

  const logoutHandler = () => {
    dispatch(logout());
    setRedirect(true);
  };

  return (
    <Fragment>
      <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Authentication</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to={"/"}>
                  <Nav.Link className={"text-center"}>Home</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav className="ml-auto">
                {isAuthenticated && user ? (
                  <Fragment>
                    <NavDropdown title={user.first_name} id={"username"}>
                      <LinkContainer to={"/profile"}>
                        <NavDropdown.Item>
                          <i className="far fa-id-card"></i> Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                    <Nav.Link onClick={logoutHandler}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </Nav.Link>
                  </Fragment>
                ) : (
                  <Fragment>
                    <LinkContainer to={"/login"}>
                      <Nav.Link className={"text-center"}>
                        <i className={"fas fa-user"}></i> Login
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={"/signup"}>
                      <Nav.Link className={"text-center"}>
                        <i className={"fas fa-user-plus"}></i> Sign Up
                      </Nav.Link>
                    </LinkContainer>
                  </Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      {redirect ? <Redirect to={"/"} /> : <Fragment></Fragment>}
    </Fragment>
  );
}

export default Header;
