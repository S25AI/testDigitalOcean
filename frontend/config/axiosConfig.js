import axios from 'axios';
import store from '../store';

const instance = axios.create();
const authInstance = axios.create();

instance.defaults.timeout = 2500;
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

authInstance.defaults.timeout = 3000;
authInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

authInstance.interceptors.request.use((config) => {
  let authToken = localStorage.getItem('token');

  if (!authToken) {
    authToken = store.getState().loginReducer.token;
  }

  if (authToken) {
    config.headers.Authorization = `Token ${authToken}`;
  }

  return config;
});

export {
  instance,
  authInstance
};