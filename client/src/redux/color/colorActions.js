import {
  GET_FAVORITE_COLOR_REQUEST,
  GET_FAVORITE_COLOR_SUCCESS,
  GET_FAVORITE_COLOR_FAILURE,
} from "./colorTypes";

import axios from "axios";
import { userApi } from "../../api/user-api";

const getFavoriteColorRequest = () => {
  return {
    type: GET_FAVORITE_COLOR_REQUEST,
  };
};

const getFavoriteColorSuccess = (favoriteColorData) => {
  return {
    type: GET_FAVORITE_COLOR_SUCCESS,
    payload: favoriteColorData,
  };
};

const getFavoriteColorFailure = (error) => {
  return {
    type: GET_FAVORITE_COLOR_FAILURE,
    payload: error,
  };
};

export const getFavoriteColor = () => {
  return async (dispatch) => {
    dispatch(getFavoriteColorRequest());

    const response = await userApi.getFavoriteColor();

    if (response.error) {
      // console.log(response);
      console.log("MESSAGE: ", response.error.message);
      const errorMsg = response.error.message;
      dispatch(getFavoriteColorFailure(errorMsg));
    } else {
      console.log(response);

      const favoriteColorData = response.data;

      // Artificially slowing down the code execution to show loading screen in the component
      setTimeout(() => {
        dispatch(getFavoriteColorSuccess(favoriteColorData));
      }, 2000);
    }
  };
};
