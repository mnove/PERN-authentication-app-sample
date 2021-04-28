import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userApi } from "../api/user-api";

// redux
import { useSelector } from "react-redux";

// TODO remove the API call from the component and get the data from the store 
// TODO conditionally render the main content only if the user is Auth.

const Home = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await userApi.getUserName();

      if (response.error) {
        // console.log(response);
        console.error("ERROR MESSAGE: ", response.error.message);
        console.error("ERROR STATUS: ", response.error.status);
      } else {
        console.log(response);
        const username = response.data.userData.name;
        setName(username);
        props.history.push("/");
      }
    };

    getData();
  }, []);

  return (
    <Fragment>
      <h1>Hi {name}, welcome back!</h1>

      <Link className="btn btn-primary btn-lg" to="/favorite-color">
        Get favorite color
      </Link>
    </Fragment>
  );
};

export default Home;
