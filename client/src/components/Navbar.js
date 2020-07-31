import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authAction";

const Navbar = (props) => {
  const logout = (e) => {
    e.preventDefault();
    props.logoutUser();
  };
  return (
    <nav>
      {props.auth.isAuthenticated ? (
        <ul className="links">
          <li>
            <a href="#" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul className="links">
          <li>
            <Link to="/Register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
