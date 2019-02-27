import {
  LOGIN_CHANGE_LOGIN,
  LOGIN_CHANGE_PASS,
  LOGIN_DATA_REQUEST,
  LOGIN_DATA_SUCCESS,
  LOGIN_DATA_FAIL,
  LOGIN_AUTH_CONNECT,
  LOGIN_AUTH_DISCONNECT
} from '../constants/loginConstants';

const initialState = {
  login: '',
  password: '',
  loading: false,
  message: null,
  status: null,
  error: null,
  isAuth: false,
  authUserLogin: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_CHANGE_LOGIN:
      return {...state, login: action.payload};

    case LOGIN_CHANGE_PASS:
      return {...state, password: action.payload};

    case LOGIN_DATA_REQUEST:
      return {...state, loading: true, error: null, login: '', password: ''};

    case LOGIN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        status: action.payload.status,
        authUserLogin: action.payload.login,
        isAuth: true
      };

    case LOGIN_DATA_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        status: null,
        error: action.payload,
        isAuth: false
      };

    case LOGIN_AUTH_CONNECT:
      return {...state, isAuth: true, authUserLogin: action.payload};

    case LOGIN_AUTH_DISCONNECT:
      return initialState;
    
    default:
      return state;
  }
};