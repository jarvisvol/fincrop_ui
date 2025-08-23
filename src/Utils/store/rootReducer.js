import { combineReducers } from "redux";
import userReducer from "../../modules/home/store/reducer";
import authReducer from "../../modules/auth/store/authReducer";
import policyReducer from "../../modules/invest/store/policyReducer";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer, 
    policy: policyReducer
})

export default rootReducer;