import {
  JOBS_DATA_REQUEST,
  JOBS_DATA_SUCCESS,
  JOBS_DATA_FAIL
} from '../constants/jobsTestConstants';
import { combineReducers } from 'redux';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const firstJob = (state = initialState, action) => {
  switch(action.type) {
    case JOBS_DATA_REQUEST:
      return {...state, loading: true, error: null};

    case JOBS_DATA_SUCCESS:
      return {...state, loading: false, data: action.payload};

    case JOBS_DATA_FAIL:
      return {...state, loading: false, data: null, error: action.payload};

    default:
      return state;
  }
};

const secondJob = (state, action) => ({
  a: 2,
  b: 3,
  c: 4
});

export default combineReducers({firstJob, secondJob});