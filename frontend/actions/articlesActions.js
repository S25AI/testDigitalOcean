import {
  ALL_ARTICLES_REQUEST,
  ALL_ARTICLES_FAIL,
  ALL_ARTICLES_SUCCESS
} from '../constants/articlesConstants';

import {instance as axios} from '../config/axiosConfig';
import {API_REQUEST_FETCH_ARTICLES} from '../constants/API';

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