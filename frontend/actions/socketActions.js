import {
  SOCKET_MESSAGES_REQUEST,
  SOCKET_MESSAGES_SUCCESS,
  SOCKET_MESSAGES_ERROR
} from '../constants/socketConstants';

import {API_REQUEST_CHAT_MESSAGES} from '../constants/API';

import axios from 'axios';

export const getChatMessages = () => (dispatch) => {
  dispatch({type: SOCKET_MESSAGES_REQUEST});
  axios.get(API_REQUEST_CHAT_MESSAGES)
    .then(response => {
      console.log('data is ', response.data);
      dispatch({
        type: SOCKET_MESSAGES_SUCCESS,
        payload: response.data
      });
    })
    .catch((err) => {
      console.log('err is ', err);
      dispatch({
        type: SOCKET_MESSAGES_ERROR,
        payload: err
      });
    })
};