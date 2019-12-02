import * as actionTypes from '../constants/ActionTypes';
import axios from '../libs/InstanceAxios';
import {toast} from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get('accessToken');

export function getAllHealthCenters() {
    return dispatch => {
        dispatch({
           type: actionTypes.GET_ALL_HEALTH_CENTERS.LOADING
        });

        axios.get('/health-centers', {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer ' + accessToken}})
            .then(response => {
                dispatch({
                    type: actionTypes.GET_ALL_HEALTH_CENTERS.SUCCESS,
                    healthCenters: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.GET_ALL_HEALTH_CENTERS.FAIL,
                    error
                });

                toast('Lỗi không thể tải dữ liệu');
            })
    }
}

export function createHealthCenter(data) {
    return dispatch => {
        dispatch({
            type: actionTypes.CREATE_HEALTH_CENTER.LOADING
        });

        axios.post('/health-centers', data, {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer ' + accessToken}})
            .then(response => {
                dispatch({
                    type: actionTypes.CREATE_HEALTH_CENTER.SUCCESS,
                    healthCenter: response.data
                });
                toast('Tạo mới thành công');
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.CREATE_HEALTH_CENTER.FAIL
                });
                toast('Có lỗi đã xảy ra');
            })
    }
}

export function deleteHealthCenter(id) {
    return dispatch => {
        dispatch({
            type: actionTypes.DELETE_HEALTH_CENTER.LOADING
        });

        axios.delete('/health-centers/' + id, {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer ' + accessToken}})
            .then(response => {
                dispatch({
                    type: actionTypes.DELETE_HEALTH_CENTER.SUCCESS,
                    healthCenterId: id
                });
                toast('Xóa thành công');
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.DELETE_HEALTH_CENTER.FAIL
                });
                toast('Có lỗi đã xảy ra');
            })
    }
}

export function updateHealthCenter(data) {
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_HEALTH_CENTER.LOADING
        });

        axios.put('/health-centers/', data, {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer ' + accessToken}})
            .then(response => {
                dispatch({
                    type: actionTypes.UPDATE_HEALTH_CENTER.SUCCESS,
                    healthCenter: response.data
                });
                toast('Cập nhật thành công');
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.UPDATE_HEALTH_CENTER.FAIL
                });
                toast('Có lỗi đã xảy ra');
            })
    }
}