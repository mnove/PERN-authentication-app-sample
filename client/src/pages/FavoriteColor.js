import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../utils/auth";
import { userApi } from "../api/user-api";

const FavoriteColor = () => {
  const [favoriteColor, setFavoriteColor] = useState("");

  useEffect(() => {
    const getData = async () => {
      // try {
      //   const response = await axios.get(
      //     "http://localhost:8000/api/favorite-color",
      //     {
      //       headers: { "Content-Type": "application/json" },
      //       withCredentials: "include",
      //     }
      //   );

      //   console.log(response.data);
      //   const username = response.data.message;
      //   setFavoriteColor(username);
      // } catch (error) {
      //   // Error
      //   if (error.response) {
      //     /*
      //      * The request was made and the server responded with a
      //      * status code that falls out of the range of 2xx
      //      */
      //     console.error(error.response.data);
      //     console.error(error.response.status);
      //     console.error(error.response.headers);
      //   } else if (error.request) {
      //     /*
      //      * The request was made but no response was received, `error.request`
      //      * is an instance of XMLHttpRequest in the browser and an instance
      //      * of http.ClientRequest in Node.js
      //      */
      //     console.error(error.request);
      //   } else {
      //     // Something happened in setting up the request and triggered an Error
      //     console.error("Error", error.message);
      //   }
      //   console.error(error);
      // }

      const response = await userApi.getFavoriteColor();

      if (response.error) {
        // console.log(response);
        console.log("MESSAGE: ", response.error.message);
      } else {
        console.log(response);

        // get and set the favorite color from the response
        const favoriteColor = response.data.message;
        setFavoriteColor(favoriteColor);
      }
    };

    getData();
  }, []);

  return (
    <div>
      {favoriteColor ? (
        <p>Your favorite color is {favoriteColor}</p>
      ) : (
        <p>You need to login to view this resource</p>
      )}
    </div>
  );
};

export default FavoriteColor;
