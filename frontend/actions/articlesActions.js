import {
  ALL_ARTICLES_REQUEST,
  ALL_ARTICLES_FAIL,
  ALL_ARTICLES_SUCCESS
} from '../constants/articlesConstants';

import axios from 'axios';
import {API_REQUEST_FETCH_ARTICLES} from '../constants/API';

console.log("NODE_ENV is ", NODE_ENV);

export const fetchAllArticles = () => {
  return (dispatch) => {
    dispatch({type: ALL_ARTICLES_REQUEST});
    axios.get(API_REQUEST_FETCH_ARTICLES)
      .then(response => {
        dispatch({
          type: ALL_ARTICLES_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        console.err('err is ', err);
        dispatch({
          type: ALL_ARTICLES_FAIL,
          payload: err.response && err.response.data
        });
      })
  };
}