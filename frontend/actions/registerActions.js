import axios from 'axios';
import store from '../store';

import {
  REGISTER_CHANGE_LOGIN,
  REGISTER_CHANGE_PASS,
  REGISTER_DATA_REQUEST,
  REGISTER_DATA_SUCCESS,
  REGISTER_DATA_FAIL
} from '../constants/registerConstants';

import {LOGIN_AUTH_CONNECT} from '../constants/loginConstants';
import {API_REQUEST_REGISTER} from '../constants/API';

export const changeLoginField = (val) => ({
  type: REGISTER_CHANGE_LOGIN,
  payload: val
});

export const changePasswordField = (val) => ({
  type: REGISTER_CHANGE_PASS,
  payload: val
});

export const handleFormSubmit = (e) => {
  e.preventDefault();
  let {
    login,
    password
  } = store.getState().registerReducer;

  return (dispatch) => {
    dispatch({type: REGISTER_DATA_REQUEST});
    axios.post(API_REQUEST_REGISTER, {login, password}, {withCredentials: true})
      .then(response => {
        dispatch({
          type: REGISTER_DATA_SUCCESS,
          payload: response.data
        });
        dispatch({type: LOGIN_AUTH_CONNECT});
      })
      .catch(err => {
        console.log('err is ', err);
        dispatch({
          type: REGISTER_DATA_FAIL,
          payload: err.response && err.response.data
        });
      });
  }
};