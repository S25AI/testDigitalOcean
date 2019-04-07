import axios from 'axios';
import store from '../store';
import Cookie from 'js-cookie';

import {
  LOGIN_CHANGE_LOGIN,
  LOGIN_CHANGE_PASS,
  LOGIN_DATA_REQUEST,
  LOGIN_DATA_SUCCESS,
  LOGIN_DATA_FAIL,
  LOGIN_AUTH_CONNECT,
  LOGIN_AUTH_DISCONNECT
} from '../constants/loginConstants';

export const changeLoginField = (val) => ({
  type: LOGIN_CHANGE_LOGIN,
  payload: val
});

export const changePasswordField = (val) => ({
  type: LOGIN_CHANGE_PASS,
  payload: val
});

export const connectAuth = (login) => ({
  type: LOGIN_AUTH_CONNECT,
  payload: login
});

export const disconnectAuth = () => {
  Cookie.remove('login');
  return {type: LOGIN_AUTH_DISCONNECT};
}

export const checkCookie = (login) => (dispatch) => {
  dispatch(connectAuth(login));
  axios.post('http://localhost:9002/api/cookieCheck', {login})
    .then(response => {
      if (response.data && response.data.message !== 'authorized') {
        dispatch(disconnectAuth());
      }
    })
    .catch(console.error);
}

export const handleFormSubmit = (e) => {
  e.preventDefault();
  let {
    login,
    password
  } = store.getState().loginReducer;

  return (dispatch) => {
    dispatch({type: LOGIN_DATA_REQUEST});
    return axios.post('http://localhost:9002/api/auth', {login, password}, {withCredentials: true})
      .then(response => {
        dispatch({
          type: LOGIN_DATA_SUCCESS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_DATA_FAIL,
          payload: err.response && err.response.data
        });
      });
  }
};