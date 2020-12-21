import * as actionTypes from "./actionType";
import { API_URL, get_headers } from "../../settings";
import axios from "axios";


export const getGlobalStart = data => {
    return {
        type: actionTypes.GET_GLOBAL,
        data: data
    };
};
export const getGlobalFail = data => {
    return {
        type: actionTypes.GET_GLOBAL_FAIL,
        data: data
    };
};
const getGlobalSuccess = data => {
    return {
        type: actionTypes.GET_GLOBAL_SUCCESS,
        data: data
    };
};

export const getProfileSuccess = data => {
    return {
        type: actionTypes.GET_PROFILE_SUCCESS,
        data: data
    };
}

export const getProfileFail = data => {
    return {
        type: actionTypes.GET_PROFILE_FAIL,
        data: data
    };
}
export const removeProfile = () => {
    return dispatch => {
        dispatch(getProfileSuccess({}))
    }
}
export const getProfile = () => {
    return dispatch => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        };
        
        axios
            .get(`${API_URL}/api/get-profile/`)
            .then(res => {
                console.log(res.data)
                dispatch(getProfileSuccess(res.data))
            })
            .catch(err => {
                dispatch(getProfileFail({"error":err.response.data}))
            })
    };
}

export const getGlobal = () => {
    return dispatch => {
        dispatch(getGlobalStart());
        console.log("here")
        axios.defaults.headers = get_headers();
        axios.get(`${API_URL}/api/get-global/`)
            .then(res => {
                console.log(res)
                dispatch(getGlobalSuccess(res))
            })
            .catch(err => {
                console.log(err)
                dispatch(getGlobalFail(err))

            })
    };
};