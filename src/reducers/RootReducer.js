import loginReducer from "./LoginReducer";
import healthCenterReducer from "./HealthCenterReducer";
import personReducer from "./PersonReducer";
import masterPersonReducer from "./MasterPersonReducer";
import masterPersonDetailReducer from "./MasterPersonDetailReducer";
import reviewLinkReducer from "./ReviewLinkReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    loginReducer,
    healthCenterReducer,
    personReducer,
    masterPersonReducer,
    masterPersonDetailReducer,
    reviewLinkReducer
});
export default rootReducer;