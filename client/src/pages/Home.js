import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { getUserData } from "../redux/index";

const Home = (props) => {
  useEffect(() => {
    const getData = async () => {
      props.getUserData();
    };

    getData();
  }, []);

  return (
    <Fragment>
      {console.log(props.user.data.userData.name)}
      {props.user.data.userData.name ? (
        <>
          <h1>Hi {props.user.data.userData.name}, welcome back!</h1>
          <Link className="btn btn-primary btn-lg" to="/favorite-color">
            Get favorite color
          </Link>
        </>
      ) : (
        <>
          <h1>Hi!</h1>
          <p>You need to login first to view this page.</p>
          <Link to="/login"> Go to Login</Link>
        </>
      )}
    </Fragment>
  );
};

// REDUX //

// mapping store state to props
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch(getUserData()),
  };
};

// connect react components to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Home);
