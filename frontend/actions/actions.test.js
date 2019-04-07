import * as actions from './loginActions';
import * as types from '../constants/loginConstants';
import thunk from '../middlewares/thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';

const event = {preventDefault() {}};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async login actions', () => {
  let mockSuccessData = {
    message: 'success',
    status: 200,
    token: 'bearer',
    userId: '123'
  };

  let mockErrorData = {
    message: 'error',
    status: 422
  };

  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates LOGIN_DATA_SUCCESS after successfully form submit', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: mockSuccessData
      });
    });

    const expectedActions = [
      {type: types.LOGIN_DATA_REQUEST},
      {type: types.LOGIN_DATA_SUCCESS, payload: mockSuccessData}
    ];

    const store = mockStore({});

    return store.dispatch(actions.handleFormSubmit(event)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LOGIN_DATA_FAILED after failed form submit', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 422,
        response: mockErrorData
      });
    });

    const expectedActions = [
      {type: types.LOGIN_DATA_REQUEST},
      {type: types.LOGIN_DATA_FAIL, payload: mockErrorData}
    ];

    const store = mockStore({});

    return store.dispatch(actions.handleFormSubmit(event)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});

describe('changeLogin', () => {
  it('should change login field', () => {
    const login = 'Michael';
    const expectedAction = {
      type: types.LOGIN_CHANGE_LOGIN,
      payload: login
    };

    expect(actions.changeLoginField(login)).toEqual(expectedAction);
  });

  it('should change password field', () => {
    const password = '123456';
    const expectedAction = {
      type: types.LOGIN_CHANGE_PASS,
      payload: password
    };

    expect(actions.changePasswordField(password)).toEqual(expectedAction);
  });
});