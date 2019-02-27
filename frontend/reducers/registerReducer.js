import {
  REGISTER_CHANGE_LOGIN,
  REGISTER_CHANGE_PASS,
  REGISTER_DATA_REQUEST,
  REGISTER_DATA_SUCCESS,
  REGISTER_DATA_FAIL
} from '../constants/registerConstants';

const initialState = {
  login: '',
  password: '',
  loading: false,
  isSuccess: false,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_CHANGE_LOGIN:
      return {...state, login: action.payload};

    case REGISTER_CHANGE_PASS:
      return {...state, password: action.payload};

    case REGISTER_DATA_REQUEST:
      return {...state, loading: true, error: null};

    case REGISTER_DATA_SUCCESS:
      return {...state, loading: false, isSuccess: true};

    case REGISTER_DATA_FAIL:
      return {...state, loading: false, isSuccess: false, error: action.payload};

    default:
      return state;
  }
};