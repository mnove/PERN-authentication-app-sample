import React, { Fragment, useState } from "react";
import {Redirect, withRouter} from "react-router-dom";
import {userApi} from "../api/user-api";


// redux
import { connect } from "react-redux";
import { loginUser } from "../redux/index";



const Login = ( props ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.loginUser(email, password);

    if (props.authData.isAuthenticated) {
      props.history.push('/');
    }



  
    // const response = await userApi.login(email, password);
    // if (response.error) {
    //   // console.log(response);
    //   console.log("MESSAGE: ", response.error.message);
    // } else {
    //   console.log(response.data);
    //   props.history.push('/');
    // }





  };


  return (
    <Fragment>
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Login</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleEmail}
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={handlePassword}
            />
            <label for="floatingInput">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>

          <div></div>
        </form>
      </main>
    </Fragment>
  );
};

// REDUX //

// mapping store state to props
const mapStateToProps = (state) => {
  return {
    authData: state.auth,
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
  };
};

// connect react components to Redux store and React Router
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));