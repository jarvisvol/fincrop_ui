import { combineReducers } from "redux";
import userReducer from "../../modules/home/store/reducer";
import authReducer from "../../modules/auth/store/authReducer";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer
})

export default rootReducer;