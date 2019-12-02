import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    healthCenters: [],
    loading: false,
    error: null
};

export default function healthCenterReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ALL_HEALTH_CENTERS.LOADING:
            return {
                ...state, loading: true
            };
        case actionTypes.GET_ALL_HEALTH_CENTERS.SUCCESS:
            return {
                healthCenters: action.healthCenters,
                loading: false,
                error: null
            };
        case actionTypes.GET_ALL_HEALTH_CENTERS.FAIL:
            return {
                healthCenters: [],
                loading: false,
                error: action.error
            };
        case actionTypes.CREATE_HEALTH_CENTER.LOADING:
            return state;
        case actionTypes.CREATE_HEALTH_CENTER.SUCCESS:
            return {
                ...state,
                healthCenters: [...state.healthCenters, action.healthCenter]
            };
        case actionTypes.CREATE_HEALTH_CENTER.FAIL:
            return state;
        case actionTypes.DELETE_HEALTH_CENTER.LOADING:
            return state;
        case actionTypes.DELETE_HEALTH_CENTER.SUCCESS:
            return {
                ...state,
                healthCenters: state.healthCenters.filter(healthCenter => {
                    return healthCenter.id !== action.healthCenterId
                })
            };
        case actionTypes.DELETE_HEALTH_CENTER.FAIL:
            return state;
        case actionTypes.UPDATE_HEALTH_CENTER.LOADING:
            return state;
        case actionTypes.UPDATE_HEALTH_CENTER.SUCCESS:
            return {
                ...state,
                healthCenters: state.healthCenters.map(healthCenter => {
                    if (healthCenter.id === action.healthCenter.id) {
                        return action.healthCenter;
                    }
                    return healthCenter;
                })
            };
        case actionTypes.UPDATE_HEALTH_CENTER.FAIL:
            return state;
        default:
            return state;
    }
}