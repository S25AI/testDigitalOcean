import store from '../store';

import {authInstance as authAxios, instance as axios} from '../config/axiosConfig';

import {
  LOGIN_CHANGE_LOGIN,
  LOGIN_CHANGE_PASS,
  LOGIN_DATA_REQUEST,
  LOGIN_DATA_SUCCESS,
  LOGIN_DATA_FAIL,
  LOGIN_AUTH_CONNECT,
  LOGIN_AUTH_DISCONNECT,
  LOGIN_AUTH_CHECK_LOADING,
  LOGIN_AUTH_CHECK_COMPLETE
} from '../constants/loginConstants';

import {API_REQUEST_AUTH, API_REQUEST_USER_AUTH_CHECK} from '../constants/API';

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
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  return {type: LOGIN_AUTH_DISCONNECT};
}

export const checkUserAuth = () => (dispatch) => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    return dispatch(disconnectAuth());
  }

  dispatch({type: LOGIN_AUTH_CHECK_LOADING});

  authAxios.post(API_REQUEST_USER_AUTH_CHECK, {userId})
    .then(response => {
      dispatch(connectAuth({login: response.data.login}));
      dispatch({type: LOGIN_AUTH_CHECK_COMPLETE})
    })
    .catch((err) => {
      console.log('err is ', err);
      dispatch({type: LOGIN_AUTH_CHECK_COMPLETE});
      dispatch(disconnectAuth());
    });

};

export const handleFormSubmit = (e) => {
  e.preventDefault();
  let {
    login,
    password
  } = store.getState().loginReducer;

  return (dispatch) => {
    dispatch({type: LOGIN_DATA_REQUEST});
    axios.post(API_REQUEST_AUTH, {username: login, password}, {withCredentials: true})
      .then(response => {
        dispatch({
          type: LOGIN_DATA_SUCCESS,
          payload: {
            token: response.data.token,
            login: response.data.username,
            userId: response.data._id
          }
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data._id);
      })
      .catch((err) => {
        console.log('err is ', err);
        dispatch({
          type: LOGIN_DATA_FAIL,
          payload: err.response && err.response.data
        });
      });
  }
};