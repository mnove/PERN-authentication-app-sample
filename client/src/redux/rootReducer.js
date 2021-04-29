import { combineReducers } from "redux";
import colorReducer from "./color/colorReducers";
import authReducer from "./auth/authReducers";
import userReducer from "./user/userReducer";


const rootReducer = combineReducers({
    
    auth: authReducer,
    user: userReducer,
    color: colorReducer,

});

export default rootReducer;