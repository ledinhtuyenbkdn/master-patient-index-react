import * as actionTypes from '../constants/ActionTypes';
import axios from '../libs/InstanceAxios';
import {toast} from "react-toastify";

export function getAllUsers() {
    return async (dispatch, getState) => {
        dispatch({
            type: actionTypes.GET_ALL_USERS.LOADING
        });

        try {
            const accessToken = getState().loginReducer.accessToken;
            const users = await axios.get('/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + accessToken
                }
            });

            const healthCenters = await axios.get('/health-centers', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + accessToken
                }
            });

            const roles = [
                {
                    'id': 1,
                    'roleName': 'ROLE_ADMIN'
                },
                {
                    'id': 2,
                    'roleName': 'ROLE_USER'
                }
            ];

            dispatch({
                type: actionTypes.GET_ALL_USERS.SUCCESS,
                users: users.data,
                healthCenters: healthCenters.data,
                roles
            });
        } catch (error) {

        }
    }
}

export function createUser(data) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.CREATE_USER.LOADING
        });

        const accessToken = getState().loginReducer.accessToken;
        axios.post('/users', data, {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer ' + accessToken}})
            .then(response => {
                dispatch({
                    type: actionTypes.CREATE_USER.SUCCESS,
                    user: response.data
                });
                toast('Tạo mới thành công');
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.CREATE_USER.FAIL
                });
                toast('Có lỗi đã xảy ra');
            })
    }
}