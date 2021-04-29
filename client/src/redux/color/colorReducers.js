import {
    GET_FAVORITE_COLOR_REQUEST,
    GET_FAVORITE_COLOR_SUCCESS,
    GET_FAVORITE_COLOR_FAILURE
  } from "./colorTypes";
  
  const initialState = {
    loading: false,
    favoriteColor: [],
    error: ""
  };
  
  const colorReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_FAVORITE_COLOR_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case GET_FAVORITE_COLOR_SUCCESS:
        return {
          loading: false,
          favoriteColor: action.payload,
          error: "",
        };
  
      case GET_FAVORITE_COLOR_FAILURE:
        return {
          loading: false,
          favoriteColor: [],
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default colorReducer;