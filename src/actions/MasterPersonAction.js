import * as actionTypes from '../constants/ActionTypes';
import axios from '../libs/InstanceAxios';
import {toast} from 'react-toastify';

export function getAllMasterPersons() {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.GET_ALL_MASTER_PERSONS.LOADING
        });

        const accessToken = getState().loginReducer.accessToken;
        axios.get('/master-persons', {headers:  {'Content-Type': 'application/json', 'Authorization': 'bearer ' + accessToken}})
            .then(response => {
                dispatch({
                    type: actionTypes.GET_ALL_MASTER_PERSONS.SUCCESS,
                    masterPersons: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.GET_ALL_MASTER_PERSONS.FAIL,
                    error: error
                });
                toast('Lỗi không thể tải dữ liệu');
            })
    }
}