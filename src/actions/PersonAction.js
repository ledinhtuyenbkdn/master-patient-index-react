import * as actionTypes from '../constants/ActionTypes';
import axios from '../libs/InstanceAxios';
import {toast} from "react-toastify";

export function getAllPersons() {
    return async (dispatch, getState) => {
        dispatch({
            type: actionTypes.GET_ALL_PERSONS.LOADING
        });

        try {
            const accessToken = getState().loginReducer.accessToken;
            const persons = await axios.get('/persons', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + accessToken
                }
            });

            const provinces = await axios.get('/provinces', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + accessToken
                }
            });

            dispatch({
                type: actionTypes.GET_ALL_PERSONS.SUCCESS,
                persons: persons.data,
                provinces: provinces.data
            });
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALL_PERSONS.FAIL,
                e
            });
            toast('Lỗi không thể tải dữ liệu');
        }
    }
}

export function createPerson(data) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.CREATE_PERSON.LOADING
        });

        const accessToken = getState().loginReducer.accessToken;
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