import thunk from 'redux-thunk';
import {
  GET_USER_CREDENTIALS, GET_USER_CREDENTIALS_SUCCESS, USER_LOGOUT, USER_RESET_FAILURE,
} from '../../../utils/constants';
import { createUser, fetchUserProcessing, loginUser, logOutUser, refreshUser, userResetFailure } from '../userActions';

const configureMockStore = require('redux-mock-store').default;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions for userActions', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        { result: 'OK' },
      ),
      ok: true,
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should creates GET_USER_CREDENTIALS_SUCCESS when register user', () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          user: {
            name: 'test name',
            email: 'test email',
          },
        }),
      }));

    const expectedActions = [
      { type: GET_USER_CREDENTIALS },
      { type: GET_USER_CREDENTIALS_SUCCESS, name: 'test name', email: 'test email' },
    ];
    const store = mockStore({});

    return store.dispatch(createUser('name', 'email', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should creates GET_USER_CREDENTIALS_SUCCESS when login user', () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          user: {
            name: 'test name',
            email: 'test email',
          },
        }),
      }));

    const expectedActions = [
      { type: GET_USER_CREDENTIALS },
      { type: GET_USER_CREDENTIALS_SUCCESS, name: 'test name', email: 'test email' },
    ];
    const store = mockStore({});

    return store.dispatch(loginUser('email', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should creates GET_USER_CREDENTIALS_SUCCESS when refresh user', () => {
    const expectedActions = {
      type: GET_USER_CREDENTIALS_SUCCESS,
      name: 'test name',
      email: 'test email',
    };
    expect(refreshUser('test name', 'test email')).toEqual(expectedActions);
  });

  it('should creates USER_LOGOUT when logout user', () => {
    const expectedActions = {
      type: USER_LOGOUT,
    };
    expect(logOutUser()).toEqual(expectedActions);
  });

  it('should creates USER_RESET_FAILURE when reset failure action', () => {
    const expectedActions = {
      type: USER_RESET_FAILURE,
    };
    expect(userResetFailure()).toEqual(expectedActions);
  });

  it('should creates GET_USER_CREDENTIALS when fetch user is processing', () => {
    const expectedActions = {
      type: GET_USER_CREDENTIALS,
    };
    expect(fetchUserProcessing()).toEqual(expectedActions);
  });
});
