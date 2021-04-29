import {
    USER_DATA_REQUEST,
    USER_DATA_SUCCESS,
    USER_DATA_FAILURE
  } from "./userTypes";


  import { userApi } from "../../api/user-api";

  const userDataRequest = () => {
    return {
      type: USER_DATA_REQUEST,
    };
  };
  
  const userDataSuccess = (userData) => {
    return {
      type: USER_DATA_SUCCESS,
      payload: userData
    };
  };
  
  const userDataFailure = (error) => {
    return {
      type: USER_DATA_FAILURE,
      payload: error,
    };
  };
  

  
  export const getUserData = () => {
    return async (dispatch) => {
      dispatch(userDataRequest);
  
      const response = await userApi.getUserData();
  
      if (response.error) {
        // console.log(response);
        console.log("MESSAGE: ", response.error.message);
        const errorMsg = response.error.message;
        dispatch(userDataFailure(errorMsg));
      } else {
        console.log(response);
  
        const userData = response.data;
  
        dispatch(userDataSuccess(userData));
      }
    };
  };
  
