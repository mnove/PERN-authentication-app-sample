import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [name, setName] = useState("sss");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user", {
          headers: { "Content-Type": "application/json" },
          withCredentials: "include",
        });

        console.log(response.data.name);
        const username = response.data.name;
        setName(username);
      } catch (error) {
        // Error
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.error(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.error("Error", error.message);
        }
        console.error(error);
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
