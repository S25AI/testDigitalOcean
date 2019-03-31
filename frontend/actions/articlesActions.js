import {
  ALL_ARTICLES_REQUEST,
  ALL_ARTICLES_FAIL,
  ALL_ARTICLES_SUCCESS,
  SINGLE_ARTICLE_REQUEST,
  SINGLE_ARTICLE_SUCCESS,
  SINGLE_ARTICLE_FAIL
} from '../constants/articlesConstants';

import {instance as axios} from '../config/axiosConfig';
import {
  API_REQUEST_FETCH_ARTICLES,
  API_REQUEST_FETCH_SINGLE_ARTICLE
} from '../constants/API';

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
        console.error('err is ', err);
        dispatch({
          type: ALL_ARTICLES_FAIL,
          payload: err.response && err.response.data
        });
      })
  };
}

export const fetchArticleById = (title='') => {
  return (dispatch) => {
    dispatch({type: SINGLE_ARTICLE_REQUEST});
    axios.get(API_REQUEST_FETCH_SINGLE_ARTICLE(title))
      .then(response => {
        if (response.data.status !== 200) {
          return dispatch({
            type: SINGLE_ARTICLE_FAIL,
            payload: 'no data'
          });
        }

        dispatch({
          type: SINGLE_ARTICLE_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        console.error('err is ', err);
        dispatch({
          type: SINGLE_ARTICLE_FAIL,
          payload: err.response && err.response.data
        });
      })
  };
}