import * as actionTypes from '../constants/ActionTypes';
import axios from '../libs/InstanceAxios';
import {toast} from "react-toastify";

export function getAllSettings() {
    return async (dispatch, getState) => {
        dispatch({
            type: actionTypes.GET_ALL_SETTINGS.LOADING
        });

        try {
            const accessToken = getState().loginReducer.accessToken;
            const settings = await axios.get('/settings', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + accessToken
                }
            });

            const fieldWeights = await axios.get('/field-weights', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + accessToken
                }
            });

            const blockingRounds = await axios.get('/blocking-rounds', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + accessToken
                }
            });

            dispatch({
                type: actionTypes.GET_ALL_SETTINGS.SUCCESS,
                settings: settings.data,
                fieldWeights: fieldWeights.data,
                blockingRounds: blockingRounds.data
            })
        } catch(error) {

        }
    }
}

export function changeAlgorithm(algorithmId) {
    return dispatch => {
        dispatch({
            type: actionTypes.CHANGE_ALGORITHM,
            id: algorithmId
        });
    }
}

export function changeManualScore(score) {
    return dispatch => {
        dispatch({
            type: actionTypes.CHANGE_MANUAL_SCORE,
            score
        })
    }
}

export function changeAutoScore(score) {
    return dispatch => {
        dispatch({
            type: actionTypes.CHANGE_AUTO_SCORE,
            score
        })
    }
}

export function changeFieldWeight(index, weight) {
    return dispatch => {
        dispatch({
            type: actionTypes.CHANGE_FIELD_WEIGHT,
            index,
            weight
        })
    }
}

export function saveAllSettings() {
    return async (dispatch, getState) => {
        dispatch({
            type: actionTypes.SAVE_ALL_SETTINGS.LOADING
        });

        const {settings, fieldWeights} = getState().settingReducer;

        try {
            const accessToken = getState().loginReducer.accessToken;
            await axios.put('/settings', settings, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + accessToken
                }
            });

            await axios.put('/field-weights', fieldWeights, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + accessToken
                }
            });

            toast('Lưu cài đặt thành công');
        } catch (error) {
            toast('Đã có lỗi xảy ra');
        }
    }
}

export function createBlockingRound(blockingRound) {
    return (dispatch, getState) => {
        const accessToken = getState().loginReducer.accessToken;
        axios.post('/blocking-rounds', blockingRound, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + accessToken
            }
        }).then(response => {
            dispatch({
                type: actionTypes.CREATE_BLOCKING_ROUND,
                blockingRound: response.data
            })
        }).catch(error => {

        });
    }
}

export function deleteBlockingRound(blockingRoundId) {
    return (dispatch, getState) => {
        const accessToken = getState().loginReducer.accessToken;
        axios.delete('/blocking-rounds/' + blockingRoundId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + accessToken
            }
        }).then(response => {
            dispatch({
                type: actionTypes.DELETE_BLOCKING_ROUND,
                id: blockingRoundId
            })
        }).catch(error => {

        });
    }
}