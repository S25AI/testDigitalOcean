import {
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAIL,
  CREATE_ARTICLE_SHOW_SUCCESS_MESSAGE,
  CREATE_ARTICLE_HIDE_SUCCESS_MESSAGE,
  CREATE_ARTICLE_SHOW_ERROR_MESSAGE,
  CREATE_ARTICLE_HIDE_ERROR_MESSAGE
} from '../constants/createArticleConstants';

const TIME_TO_SHOW = 5000;

import store from '../store';
import axios from 'axios';

export const sendCreateArticleRequest = (data) => {
  let {authUserLogin: author} = store.getState().loginReducer;
  return (dispatch) => {
    dispatch({type: CREATE_ARTICLE_REQUEST});
    axios.post('http://localhost:9002/api/createArticle', {...data, author})
      .then(response => {
        dispatch({
          type: CREATE_ARTICLE_SUCCESS,
          payload: response.data
        });
        dispatch({type: CREATE_ARTICLE_SHOW_SUCCESS_MESSAGE});
        return new Promise(resolve => setTimeout(() => resolve(), TIME_TO_SHOW));
      })
      .then(() => dispatch({type: CREATE_ARTICLE_HIDE_SUCCESS_MESSAGE}))
      .catch(err => {
        console.log('err is ', err);
        dispatch({
          type: CREATE_ARTICLE_FAIL,
          payload: err.response && err.response.data
        });
        dispatch({type: CREATE_ARTICLE_SHOW_ERROR_MESSAGE});
        return new Promise(resolve => setTimeout(() => resolve(), TIME_TO_SHOW));
      })
      .then(() => dispatch({type: CREATE_ARTICLE_HIDE_ERROR_MESSAGE}))
  }
};