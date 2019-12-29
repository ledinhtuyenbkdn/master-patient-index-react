import * as actionTypes from '../constants/ActionTypes';
import axios from '../libs/InstanceAxios';
import {toast} from "react-toastify";
import Cookies from 'universal-cookie';

export function login({userName, password}) {
    return (dispatch) => {
        dispatch({
            type: actionTypes.LOGIN.LOADING
        });
        axios.post('/login', null, {params: {'userName': userName, 'password': password}, headers: {'Content-Type': 'application/json'}})
            .then(response => {
                dispatch({
                    type: actionTypes.LOGIN.SUCCESS,
                    accessToken: response.data.accessToken
                });

                const cookies = new Cookies();
                cookies.set('accessToken', response.data.accessToken, {path: '/'});
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.LOGIN.FAIL,
                    error
                });
                toast('Tài khoản hoặc mật khẩu không đúng');
            })
    }
}

export function logout() {
    return dispatch => {
        dispatch({
            type: actionTypes.LOGOUT
        });

        const cookies = new Cookies();
        cookies.remove('accessToken');
    }
}

export function loadAccessTokenFromCookies() {
    return dispatch => {
        const cookies = new Cookies();
        const accessToken = cookies.get('accessToken');
        if (accessToken !== undefined && accessToken !== null && accessToken !== '') {
            dispatch({
                type: actionTypes.LOGIN.SUCCESS,
                accessToken
            });
        }
    }
}