import React, { Fragment, useState } from "react";
import {Redirect, withRouter} from "react-router-dom";
import { userApi } from "../api/user-api";



const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");

  const [redirect, setRedirect] = useState("false");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFavoriteColor = (e) => {
      setFavoriteColor(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let newUser = {
    //   name: name,
    //   email: email,
    //   password: password,
    //   favoriteColor: favoriteColor
    // };

    //  const response = await fetch("http://localhost:8000/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newUser),
    // });

    // if (response.ok) {
    //     console.log(response.ok);
    //      props.history.push('/login');
    //     return;
    // } throw new Error('Request failed!');

    const response = await userApi.register(name, email, password, favoriteColor);
    
    
    if (response.error) {
      // console.log(response);
      console.log("MESSAGE: ", response.error.message);

    } else {
      console.log(response.data);
      props.history.push('/login');
    }



  };
  




  return (
    <Fragment>
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Your Name"
              onChange={handleName}
            />
            <label for="floatingInput">Name</label>
          </div>

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

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="FavoriteColor"
              onChange={handleFavoriteColor}
            />
            <label for="floatingInput">Your Favorite Color</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>

          <div></div>
        </form>
      </main>
    </Fragment>
  );
};

export default withRouter(Register);
