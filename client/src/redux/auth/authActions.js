import {
    SET_LOGIN_STATUS,
  } from "./authTypes";


import axios from "axios";
import {userApi} from "../../api/user-api";
 


export const fetchUsersRequest = () => {
    return {
      type: FETCH_USERS_REQUEST,
    };
  };
  
  const fetchUsersSuccess = (users) => {
    return {
      type: FETCH_USERS_SUCCESS,
      payload: users,
    };
  };
  
  const fetchUsersFailure = (error) => {
    return {
      type: FETCH_USERS_FAILURE,
      payload: error,
    };
  };

  export const fetchUsers = () => {
    return (dispatch) => {
  
      dispatch(fetchUsersRequest);

      const response = await userApi.login(email, password);


      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          const users = response.data;
          dispatch(fetchUsersSuccess(users));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchUsersFailure(errorMsg));
        });



    };
  };
