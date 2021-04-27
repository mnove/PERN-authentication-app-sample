import resolve from "../utils/resolver";


const axios = require("axios").create({
  baseURL: "http://localhost:8000/",
});

export const userApi = {
  /**
   * login user with credentials (JWT)
   * @param {string} email
   * @param {string} password
   */

  login: async function (email, password) {
    let loggingUser = {
      email: email,
      password: password,
    };

    console.log("loggin user", loggingUser);

    return await resolve(
      axios({
        method: "POST",
        url: "api/login",
        data: loggingUser,
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },

  /**
   * Get the user's name
   */

  getUserName: async () => {

    return await resolve(
      axios({
        method: "GET",
        url: "api/user",
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );



  },


  /**
   * Register a new user
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {string} favColor
   */

  register: async function (name, email, password, favColor) {
    let newUser = {
      name: name,
      email: email,
      password: password,
      favoriteColor: favColor,
    };

    return await resolve(
      axios({
        method: "POST",
        url: "api/register",
        data: newUser,
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },

  /**
   * logout the user
   */

  logout: async function () {
    return await resolve(
      axios({
        method: "GET",
        url: "api/logout",
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },

  /**
   * Get favorite color
   */

  getFavoriteColor: async function () {
    return await resolve(
      axios({
        method: "GET",
        url: "api/favorite-color",
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },
};
