import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    accessToken: null,
    userName: null,
    roles: [],
    loading: false,
    error: null
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN.LOADING:
            return {
                ...state, loading: true
            };
        case actionTypes.LOGIN.SUCCESS:
            return {
                accessToken: action.accessToken,
                userName: getUserNameFromToken(action.accessToken),
                roles: getRolesFromToken(action.accessToken),
                loading: false,
                error: null
            };
        case actionTypes.LOGIN.FAIL:
            return {
                accessToken: null,
                userName: null,
                roles: [],
                loading: false,
                error: action.error
            };
        case actionTypes.LOGOUT:
            return {
                accessToken: null,
                userName: null,
                roles: [],
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

function getUserNameFromToken(accessToken) {
    const payload = accessToken.split('.')[1];
    if (payload == null) {
        throw new Error('Payload is null');
    }
    return JSON.parse(atob(payload)).sub;
}


function getRolesFromToken(accessToken) {
    const payload = accessToken.split('.')[1];
    if (payload == null) {
        throw new Error('Payload is null');
    }
    return JSON.parse(atob(payload)).role;
}