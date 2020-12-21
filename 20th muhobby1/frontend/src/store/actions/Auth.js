import axios from "axios";
import * as actionTypes from "./actionType";
import { API_URL } from "../../settings";
import { getProfile, getProfileSuccess } from './global_settings'
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (username, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username
  };
};
export const SignUpSuccess = (message) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    message: message
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logoutStart = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
export const logout = () => {
  return dispatch => {
    dispatch(getProfileSuccess({}))
    dispatch(logoutStart())
  }
}
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password, redirect, path) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${API_URL}/api/login/`, {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.response.token;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 240);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(res.data.response.username, token));
        dispatch(getProfile());
        localStorage.setItem("username", res.data.response.username,);
        dispatch(checkAuthTimeout(3600));
        if (redirect && path) {
          redirect.push(path)
        }
      })
      .catch(err => {
        console.log(err.response.data)
        let data = {
          type:"login",
          message: err.response.data.response
        }
        dispatch(authFail(data))

      });
  };
};

export const authSignup = (username, password1, password2, first_name, last_name) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${API_URL}/api/signup/`, {
        username: username,
        password1: password1,
        password2: password2,
        first_name: first_name,
        last_name: last_name

      })
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("username", username);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(SignUpSuccess(res.data.response));
      })
      .catch(err => {
        console.log(err.response.data)
        let data = {
          type: "signup",
          message: err.response.data.response
        }
        dispatch(authFail(data))
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(username, token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};