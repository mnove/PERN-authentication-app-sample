import React, { Fragment, useState } from "react";
import {Redirect, withRouter} from "react-router-dom";
import {userApi} from "../api/user-api";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   //fetch() Async POST Request 

  //   let loggingUser = {
  //     email: email,
  //     password: password,
  //   };

  //   try {
  //     const options = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: 'include', // to get the cookie in every request to get the user authenticated
  //       body: JSON.stringify(loggingUser),
  //     };

  //     const response = await fetch("http://localhost:8000/api/login", options);

  //     if (response.ok) {
  //       const jsonResponse = await response.json();
  //       props.history.push('/');
  //       console.log(jsonResponse);
  //       return jsonResponse;
  //     }
      
  //     throw new Error("Request failed!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    //

  
    const response = await userApi.login(email, password);
    
    
    if (response.error) {
      // console.log(response);
      console.log("MESSAGE: ", response.error.message);

    } else {
      console.log(response.data);
      props.history.push('/');
    }


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

export default withRouter(Login);
