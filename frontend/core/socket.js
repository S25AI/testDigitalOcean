//const socket = new WebSocket('ws://localhost:8282');
import {
  SOCKET_DATA_RECEIVE,
  SOCKET_DATA_SEND,
  SOCKET_DATA_ERROR
} from '../constants/socketConstants';

import store from '../store';

class Socket {
  constructor(socket) {
    this.socket = new WebSocket(socket);

    this.socket.onmessage = this._onMessage;
    this.socket.onclose = this._onClose;
    this.socket.onerror = this._onError;
    this.socket.onopen = this._onOpen;

    this.isConnected = false;
  }

  _onMessage = (event) => {
    console.log('data is ', event.data);
    store.dispatch({
      type: SOCKET_DATA_RECEIVE,
      payload: JSON.parse(event.data)
    });
  }

  _onClose = (event) => {
    this.isConnected = false;
    console.log('event is ', event);
  }

  _onError = (error) => {
    this.isConnected = false;
    console.log('error.message is ', error.message);
    store.dispatch({
      type: SOCKET_DATA_ERROR,
      payload: JSON.parse(error)
    });
  }

  _onOpen = () => {
    this.isConnected = true;
    console.log('websocket connection established');
  }

  sendMessage(data) {
    if (!this.isConnected) return;
    this.socket.send(JSON.stringify(data));
    store.dispatch({
      type: SOCKET_DATA_SEND,
      payload: data
    });
  }
}

export default new Socket(NODE_ENV === 'production' ? 'ws://139.59.196.209/websocket' : 'ws://localhost:8282');