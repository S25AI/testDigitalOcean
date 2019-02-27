import {
  SOCKET_DATA_RECEIVE,
  SOCKET_DATA_SEND,
  SOCKET_DATA_ERROR,
  SOCKET_MESSAGES_REQUEST,
  SOCKET_MESSAGES_SUCCESS,
  //ToDO: SOCKET_MESSAGES_ERROR
} from '../constants/socketConstants';

const initialState = {
  comments: [],
  error: null,
  loading: false,
  commentsLoading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SOCKET_DATA_RECEIVE:
      return {...state, error: null, loading: false, comments: [...state.comments, action.payload]};

    case SOCKET_DATA_SEND:
      return {...state, loading: true};

    case SOCKET_DATA_ERROR:
      return {...state, loading: false, error: true};

    case SOCKET_MESSAGES_REQUEST:
      return {...state, commentsLoading: true};

    case SOCKET_MESSAGES_SUCCESS:
      return {...state, commentsLoading: false, comments: [...state.comments, ...action.payload.messages]}

    default:
      return state;
  }
};
