import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    masterPersonDetail: {
        fullName: '',
        healthInsuranceNumber: '',
        identificationNumber: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        people: []
    },
    loading: false,
    error: null
};

export default function masterPersonDetailReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_MASTER_PERSON_DETAIL.LOADING:
            return {
                ...state, loading: true
            };
        case actionTypes.GET_MASTER_PERSON_DETAIL.SUCCESS:
            return {
                masterPersonDetail: action.masterPersonDetail,
                loading: false,
                error: null
            };
        case actionTypes.GET_MASTER_PERSON_DETAIL.FAIL:
            return {
                masterPersonDetail: null,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}