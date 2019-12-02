import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    persons: [],
    loading: false,
    error: null
};

export default function personReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ALL_PERSONS.LOADING:
            return {
                ...state, loading: true
            };
        case actionTypes.GET_ALL_PERSONS.SUCCESS:
            return {
                persons: action.persons,
                loading: false,
                error: null
            };
        case actionTypes.GET_ALL_PERSONS.FAIL:
            return {
                persons: [],
                loading: false,
                error: action.error
            };
        case actionTypes.CREATE_PERSON.LOADING:
            return state;
        case actionTypes.CREATE_PERSON.SUCCESS:
            return {
                ...state, persons: [...state.persons, action.person]
            };
        case actionTypes.CREATE_PERSON.FAIL:
            return state;
        default:
            return state;
    }
}