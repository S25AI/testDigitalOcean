import {
  LOGIN_CHANGE_LOGIN,
  LOGIN_CHANGE_PASS,
  LOGIN_DATA_REQUEST,
  LOGIN_DATA_SUCCESS,
  LOGIN_DATA_FAIL,
  LOGIN_AUTH_CONNECT,
  LOGIN_AUTH_DISCONNECT,
  LOGIN_AUTH_CHECK_LOADING,
  LOGIN_AUTH_CHECK_COMPLETE
} from '../constants/loginConstants';

const initialState = {
  login: '',
  password: '',
  loading: false,
  authCheckLoading: false,
  message: null,
  status: null,
  error: null,
  isAuth: false,
  authUserLogin: '',
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_CHANGE_LOGIN:
      return {...state, login: action.payload};

    case LOGIN_CHANGE_PASS:
      return {...state, password: action.payload};

    case LOGIN_DATA_REQUEST:
      return {...state, loading: true, error: null, login: '', password: ''};

    case LOGIN_AUTH_CHECK_LOADING:
      return {...state, authCheckLoading: true};

    case LOGIN_AUTH_CHECK_COMPLETE:
      return {...state, authCheckLoading: false};

    case LOGIN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        status: action.payload.status,
        authUserLogin: action.payload.login,
        token: action.payload.token,
        userId: action.payload.userId,
        isAuth: true
      };

    case LOGIN_DATA_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        status: null,
        error: action.payload,
        isAuth: false,
        token: null,
        userId: null
      };

    case LOGIN_AUTH_CONNECT:
      return {
        ...state,
        isAuth: true,
        authUserLogin: action.payload ? action.payload.login : '',
        token: action.payload ? action.payload.token : null,
        userId: action.payload ? action.payload.userId : null
      };

    case LOGIN_AUTH_DISCONNECT:
      return initialState;
    
    default:
      return state;
  }
};