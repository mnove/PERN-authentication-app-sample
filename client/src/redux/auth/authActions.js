import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from "./authTypes";

import { userApi } from "../../api/user-api";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  }
}

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    const response = await userApi.login(email, password);

    if (response.error) {
      // console.log(response);
      console.log("MESSAGE: ", response.error.message);
      const errorMsg = response.error.message;
      dispatch(loginFailure(errorMsg));
    } else {
      console.log(response);

      // const loginResponse = response.data;

      dispatch(loginSuccess());
    }
  };
};

export const verifyUserLogin = () => {
  return async (dispatch) => {
    dispatch(loginRequest());

    const response = await userApi.verifyUserIsLoggedIn();

    if (response.error) {
      // console.log(response);
      console.log("MESSAGE: ", response.error.message);
      const errorMsg = response.error.message;
      dispatch(loginFailure(errorMsg));
    } else {

      console.log("this is the response of the verifyUserLogin", response);

      // const loginResponse = response.data;

      dispatch(loginSuccess());
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logoutRequest);

    const response = await userApi.logout();

    if (response.error) {
      // console.log(response);
      console.log("MESSAGE: ", response.error.message);
      // const errorMsg = response.error.message;
      // dispatch(loginFailure(errorMsg));
    } else {
      console.log(response);

      // const loginResponse = response.data;

       dispatch(logoutSuccess());
    }
  };
};




