import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Alert from "react-bootstrap/Alert";


// redux
import { connect } from "react-redux";
import { loginUser } from "../redux/index";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await props.loginUser(email, password);

    

    
  };

  useEffect(() => {
    if (props.auth.error === "") {
      setShowAlert(false);
      setAlertMessage("");
    } else  {
      setShowAlert(true);
      
      setAlertMessage(props.auth.error)
    }
  
    if (props.auth.isAuthenticated) {
      props.history.push("/");
    }
  }, [props.auth.loading]);

  
  


  // Alerts 
  function renderAlert() {
    if (showAlert) {
      return (
        <Fragment>
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>{alertMessage}</Alert.Heading>
            <p></p>
          </Alert>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
    {renderAlert()}
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
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={handlePassword}
            />
            <label htmlFor="floatingInput">Password</label>
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
    auth: state.auth,
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
