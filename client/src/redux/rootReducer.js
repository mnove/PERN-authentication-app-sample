import { combineReducers } from "redux";
import colorReducer from "./color/colorReducers";
import authReducer from "./auth/authReducers";


const rootReducer = combineReducers({
    
    auth: authReducer,
    color: colorReducer,

});

export default rootReducer;