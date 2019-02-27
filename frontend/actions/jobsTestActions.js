import {
  JOBS_DATA_REQUEST,
  JOBS_DATA_SUCCESS,
  JOBS_DATA_FAIL
} from '../constants/jobsTestConstants';

export const simulateJobsRequest = () => (dispatch) => {
  dispatch({type: JOBS_DATA_REQUEST});
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({model: 'test', action: 'someTestAction'});
    }, 2500);
  })
  .then(response => dispatch({
    type: JOBS_DATA_SUCCESS,
    payload: response
  }))
  .catch(err => dispatch({
    type: JOBS_DATA_FAIL,
    payload: err
  }));
}
