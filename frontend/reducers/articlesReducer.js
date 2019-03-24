import {
  ALL_ARTICLES_REQUEST,
  ALL_ARTICLES_FAIL,
  ALL_ARTICLES_SUCCESS
} from '../constants/articlesConstants';

const initialState = {
  loading: false,
  data: [],
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ALL_ARTICLES_REQUEST:
      return {...state, loading: true, error: null};

    case ALL_ARTICLES_SUCCESS:
      return {...state, loading: false, data: action.payload.messages};

    case ALL_ARTICLES_FAIL:
      return {...state, loading: false, data: [], error: action.payload};

    default:
      return state;
  }
};