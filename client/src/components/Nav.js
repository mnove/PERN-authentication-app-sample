import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { userApi } from "../api/user-api";

const Nav = () => {


    const handleLogout = async () => {
       

        // try {

        //     const response = await axios.get("http://localhost:8000/api/logout", {
        //         method: "get",
        //         headers: { "Content-Type": "application/json" },
        //         withCredentials: 'include',
        //     })

        //     console.log(response);
            
        // } catch (error) {
        //     console.error(error);
        // }

        const response = await userApi.logout();

        if (response.error) {
          // console.log(response);
          console.log("MESSAGE: ", response.error.message);
    
        } else {
          console.log(response.data);
        }
        

    }
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

export default Nav;
