import loginReducer from "./LoginReducer";
import healthCenterReducer from "./HealthCenterReducer";
import personReducer from "./PersonReducer";
import masterPersonReducer from "./MasterPersonReducer";
import masterPersonDetailReducer from "./MasterPersonDetailReducer";
import reviewLinkReducer from "./ReviewLinkReducer";
import settingReducer from "./SettingReducer";
import userReducer from "./UserReducer";
import dashboardReducer from "./DashboardReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    loginReducer,
    healthCenterReducer,
    personReducer,
    masterPersonReducer,
    masterPersonDetailReducer,
    reviewLinkReducer,
    settingReducer,
    userReducer,
    dashboardReducer
});
export default rootReducer;