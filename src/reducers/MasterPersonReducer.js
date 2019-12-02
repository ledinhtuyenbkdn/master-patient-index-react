import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    masterPersons: [],
    loading: false,
    error: null
};

export default function masterPersonReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ALL_MASTER_PERSONS.LOADING:
            return {
                ...state, loading: true
            };
        case actionTypes.GET_ALL_MASTER_PERSONS.SUCCESS:
            return {
                masterPersons: action.masterPersons,
                loading: false,
                error: null
            };
        case actionTypes.GET_ALL_MASTER_PERSONS.FAIL:
            return {
                masterPersons: [],
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}