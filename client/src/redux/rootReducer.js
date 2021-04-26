import { combineReducers } from "redux";
import colorReducer from "./color/colorReducers";


const rootReducer = combineReducers({

    color: colorReducer,

});

export default rootReducer;