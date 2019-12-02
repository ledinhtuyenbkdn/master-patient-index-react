import * as actionTypes from '../constants/ActionTypes';
import axios from '../libs/InstanceAxios';
import {toast} from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get('accessToken');

export function getMasterPersonDetail(id) {
    return dispatch => {
        dispatch({
            type: actionTypes.GET_MASTER_PERSON_DETAIL.LOADING
        });

        axios.get('/master-persons/' + id, {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer ' + accessToken}})
            .then(response => {
                dispatch({
                   type: actionTypes.GET_MASTER_PERSON_DETAIL.SUCCESS,
                   masterPersonDetail: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.GET_MASTER_PERSON_DETAIL.FAIL,
                    error: error
                });

                toast('Lỗi không thể tải dữ liệu');
            })
    }
}