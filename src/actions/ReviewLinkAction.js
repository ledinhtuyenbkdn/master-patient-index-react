import * as actionTypes from '../constants/ActionTypes';
import axios from '../libs/InstanceAxios';
import {toast} from "react-toastify";

export function getAllReviewLinks() {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.GET_ALL_REVIEW_LINKS.LOADING
        });

        const accessToken = getState().loginReducer.accessToken;
        axios.get('/review-links', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + accessToken
            }
        })
            .then(response => {
                dispatch({
                    type: actionTypes.GET_ALL_REVIEW_LINKS.SUCCESS,
                    reviewLinks: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.GET_ALL_REVIEW_LINKS.FAIL,
                    error
                });

                toast('Lỗi không thể tải dữ liệu');
            })
    }
}

export function approveReviewLink(id) {
    return (dispatch, getState) => {
        const accessToken = getState().loginReducer.accessToken;
        axios.post('/review-links/' + id + '/match', null, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + accessToken
            }
        })
            .then(response => {
                dispatch({
                    type: actionTypes.APPROVE_REVIEW_LINK,
                    id
                });

                toast('Approved a review link');
            })
            .catch(error => {
                toast('Lỗi không thể tải dữ liệu');
            })
    }
}

export function rejectReviewLink(id) {
    return (dispatch, getState) => {
        const accessToken = getState().loginReducer.accessToken;
        axios.post('/review-links/' + id + '/reject', null, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + accessToken
            }
        })
            .then(response => {
                dispatch({
                    type: actionTypes.REJECT_REVIEW_LINK,
                    id
                });

                toast('Rejected a review link');
            })
            .catch(error => {
                toast('Lỗi không thể tải dữ liệu');
            })
    }
}

