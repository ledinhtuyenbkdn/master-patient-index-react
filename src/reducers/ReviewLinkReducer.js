import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    reviewLinks: [],
    loading: false,
    error: null
};

export default function reviewLinkReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ALL_REVIEW_LINKS.LOADING:
            return {
                ...state, loading: true
            };
        case actionTypes.GET_ALL_REVIEW_LINKS.SUCCESS:
            return {
                reviewLinks: action.reviewLinks,
                loading: false,
                error: null
            };
        case actionTypes.GET_ALL_REVIEW_LINKS.FAIL:
            return {
                reviewLinks: [],
                loading: false,
                error: action.error
            };
        case actionTypes.APPROVE_REVIEW_LINK:
            let approvedReviewLink;
            state.reviewLinks.forEach(reviewLink => {
                if (reviewLink.id === action.id) {
                    approvedReviewLink = reviewLink;
                }
            });
            let approvedPersonId = approvedReviewLink.person.id;

            return {
                reviewLinks: state.reviewLinks.filter(reviewLink => reviewLink.person.id !== approvedPersonId),
                loading: false,
                error: null
            };
        case actionTypes.REJECT_REVIEW_LINK:
            return {
                reviewLinks: state.reviewLinks.filter(reviewLink => reviewLink.id !== action.id),
                loading: false,
                error: null
            };
        default:
            return state;
    }
}