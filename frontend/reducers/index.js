import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import jobsTestReducer from './jobsTestReducer';
import socketReducer from './socketReducer';
import createArticleReducer from './createArticleReducer';
import articlesReducer from './articlesReducer';

export default combineReducers({
  loginReducer,
  registerReducer,
  jobsTestReducer,
  socketReducer,
  createArticleReducer,
  articlesReducer
});
