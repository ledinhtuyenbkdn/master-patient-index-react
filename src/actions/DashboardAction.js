import * as actionTypes from '../constants/ActionTypes';
import axios from '../libs/InstanceAxios';
import {toast} from "react-toastify";

export function getDashboardData() {
    return async (dispatch, getState) => {
        try {
            const accessToken = getState().loginReducer.accessToken;
            const dashboardData = await axios.get('/dashboard', {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer ' + accessToken}});
            dispatch({
                type: actionTypes.GET_DASHBOARD_DATA,
                dashboardData: dashboardData.data
            });
        } catch (e) {
            toast('Có lỗi đã xảy ra.')
        }
    }
}