import {
  ALL_ARTICLES_REQUEST,
  ALL_ARTICLES_FAIL,
  ALL_ARTICLES_SUCCESS,
  SINGLE_ARTICLE_REQUEST,
  SINGLE_ARTICLE_SUCCESS,
  SINGLE_ARTICLE_FAIL
} from '../constants/articlesConstants';

const initialState = {
  loading: false,
  data: [],
  error: null,
  singleLoading: false,
  singleError: false,
  singleData: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ALL_ARTICLES_REQUEST:
      return {...state, loading: true, error: null};

    case ALL_ARTICLES_SUCCESS:
      return {...state, loading: false, data: action.payload.messages};

    case ALL_ARTICLES_FAIL:
      return {...state, loading: false, data: [], error: action.payload};

    case SINGLE_ARTICLE_REQUEST:
      return {...state, singleLoading: true, singleError: null}

    case SINGLE_ARTICLE_SUCCESS:
      return {...state, singleData: action.payload.data, singleLoading: false};

    case SINGLE_ARTICLE_FAIL:
      return {...state, singleError: action.payload, singleLoading: false};

    default:
      return state;
  }
};