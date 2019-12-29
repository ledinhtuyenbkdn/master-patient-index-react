import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    users: [],
    healthCenters: [],
    roles: [],
    loading: false,
    error: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ALL_USERS.LOADING:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_ALL_USERS.SUCCESS:
            return {
                users: action.users,
                healthCenters: action.healthCenters,
                roles: action.roles,
                loading: false,
                error: null
            };
        case actionTypes.GET_ALL_USERS.FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.CREATE_USER.LOADING:
            return state;
        case actionTypes.CREATE_USER.SUCCESS:
            return {
                ...state, users: [...state.users, action.user]
            };
        case actionTypes.CREATE_USER.FAIL:
            return state;
        default:
            return state;
    }
}