import {
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAIL,
  CREATE_ARTICLE_SHOW_SUCCESS_MESSAGE,
  CREATE_ARTICLE_HIDE_SUCCESS_MESSAGE,
  CREATE_ARTICLE_SHOW_ERROR_MESSAGE,
  CREATE_ARTICLE_HIDE_ERROR_MESSAGE
} from '../constants/createArticleConstants';

const initialState = {
  loading: false,
  error: null,
  isSuccess: true,
  isShowSuccessMessage: false,
  isShowErrorMessage: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case CREATE_ARTICLE_REQUEST:
      return {...state, error: null, loading: true};

    case CREATE_ARTICLE_SUCCESS:
      return {...state, isSuccess: true, loading: false};

    case CREATE_ARTICLE_FAIL:
      return {...state, error: true, loading: false};

    case CREATE_ARTICLE_SHOW_SUCCESS_MESSAGE:
      return {...state, isShowSuccessMessage: true, isShowErrorMessage: false};

    case CREATE_ARTICLE_HIDE_SUCCESS_MESSAGE:
      return {...state, isShowSuccessMessage: false};

    case CREATE_ARTICLE_SHOW_ERROR_MESSAGE:
      return {...state, isShowSuccessMessage: false, isShowErrorMessage: true};

    case CREATE_ARTICLE_HIDE_ERROR_MESSAGE:
      return {...state, isShowErrorMessage: false}
    
    default:
      return state;
  }
};