import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { logoutUser } from "../redux/index";

const Nav = (props) => {
  const handleLogout = async () => {
    await props.logoutUser();
     await props.history.push("/login");
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>

              <Link className="nav-link" to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

// REDUX //

// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

// connect react components to Redux store and React Router
export default withRouter(connect(null, mapDispatchToProps)(Nav));
