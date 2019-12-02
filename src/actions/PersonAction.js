import * as actionTypes from '../constants/ActionTypes';
import axios from '../libs/InstanceAxios';
import Cookies from "universal-cookie";
import {toast} from "react-toastify";

const cookies = new Cookies();
const accessToken = cookies.get('accessToken');

export function getAllPersons() {
    return dispatch => {
        dispatch({
            type: actionTypes.GET_ALL_PERSONS.LOADING
        });

        axios.get('/persons', {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer ' + accessToken}})
            .then(response => {
                dispatch({
                    type: actionTypes.GET_ALL_PERSONS.SUCCESS,
                    persons: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.GET_ALL_PERSONS.FAIL,
                    error
                });
                toast('Lỗi không thể tải dữ liệu');
            })
    }
}

export function createPerson(data) {
    return dispatch => {
        dispatch({
            type: actionTypes.CREATE_PERSON.LOADING
        });

        axios.post('/persons', data, {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer ' + accessToken}})
            .then(response => {
                dispatch({
                    type: actionTypes.CREATE_PERSON.SUCCESS,
                    person: response.data
                });
                toast('Tạo mới thành công');
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.CREATE_PERSON.FAIL
                });
                toast('Có lỗi đã xảy ra');
            })
    }
}