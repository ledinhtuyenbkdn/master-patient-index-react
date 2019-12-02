const buildActionTypes = (action) => {
    return {
        LOADING: `${action}_LOADING`,
        SUCCESS: `${action}_SUCCESS`,
        FAIL: `${action}_FAIL`
    }
};

export const GET_ALL_MATCHING_METHODS = buildActionTypes('GET_ALL_MATCHING_METHODS');

export const GET_ALL_BLOCKING_ROUNDS = buildActionTypes('GET_ALL_BLOCKING_ROUNDS');

export const GET_ALL_HEALTH_CENTERS = buildActionTypes('GET_ALL_HEALTH_CENTERS');
export const CREATE_HEALTH_CENTER = buildActionTypes('CREATE_HEALTH_CENTER');
export const UPDATE_HEALTH_CENTER = buildActionTypes('UPDATE_HEALTH_CENTER');
export const DELETE_HEALTH_CENTER = buildActionTypes('DELETE_HEALTH_CENTER');

export const GET_ALL_PERSONS = buildActionTypes('GET_ALL_PERSONS');
export const CREATE_PERSON = buildActionTypes('CREATE_PERSON');

export const GET_ALL_MASTER_PERSONS = buildActionTypes('GET_ALL_MASTER_PERSONS');

export const GET_MASTER_PERSON_DETAIL = buildActionTypes('GET_MASTER_PERSON_DETAIL');

export const GET_ALL_REVIEW_LINKS = buildActionTypes('GET_ALL_REVIEW_LINKS');

export const APPROVE_REVIEW_LINK = 'APPROVE_REVIEW_LINK';

export const REJECT_REVIEW_LINK = 'REJECT_REVIEW_LINK';

export const LOGIN = buildActionTypes('LOGIN');

export const LOGOUT = 'LOGOUT';