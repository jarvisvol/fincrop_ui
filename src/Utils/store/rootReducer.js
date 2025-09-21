import { combineReducers } from "redux";
import authReducer from "../../modules/auth/store/authReducer";
import policyReducer from "../../modules/invest/store/policyReducer";
import profileReducer from "../../modules/profile/store/profileReducer";
import portfolioReducer from "../../modules/portfolio/store/portfolioReducer";
import dashboardReducer from "../../modules/home/store/dashboardSlice"

const rootReducer = combineReducers({
    auth: authReducer, 
    policy: policyReducer,
    profile: profileReducer,
    portfolio: portfolioReducer,
    dashboard: dashboardReducer
})

export default rootReducer;