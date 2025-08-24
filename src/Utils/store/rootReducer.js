import { combineReducers } from "redux";
import userReducer from "../../modules/home/store/reducer";
import authReducer from "../../modules/auth/store/authReducer";
import policyReducer from "../../modules/invest/store/policyReducer";
import profileReducer from "../../modules/profile/store/profileReducer";
import portfolioReducer from "../../modules/portfolio/store/portfolioReducer";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer, 
    policy: policyReducer,
    profile: profileReducer,
    portfolio: portfolioReducer,
})

export default rootReducer;