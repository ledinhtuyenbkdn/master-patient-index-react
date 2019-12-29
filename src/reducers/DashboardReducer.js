import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    dashboardData: {
        newMasterPerson: 0,
        needReview: 0,
        manualMatch: 0,
        autoMatch: 0,
        fastMatch: 0
    }
};

export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DASHBOARD_DATA:
            return {
                dashboardData: action.dashboardData
            };
        default:
            return state;
    }
}