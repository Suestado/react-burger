import getUserCredentialsReducer from '../userReducers';
import {
  GET_USER_CREDENTIALS,
  GET_USER_CREDENTIALS_FAILURE,
  GET_USER_CREDENTIALS_SUCCESS,
  USER_LOGOUT,
  USER_RESET_FAILURE,
} from '../../../utils/constants';

const initialState = {
  name: '',
  email: '',
  getUserProcessing: false,
  getUserFailure: false,
  showFailureMessage: false,
  failureMessage: null,
  isLoggedIn: false,
};

describe('reducer for userReducers', () => {
  it('should return the initial state', () => {
    expect(getUserCredentialsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_USER_CREDENTIALS', () => {
    expect(
      getUserCredentialsReducer(initialState, {
        type: GET_USER_CREDENTIALS,
      }),
    ).toEqual({
      ...initialState,
      getUserProcessing: true,
      getUserFailure: false,
    });
  });

  it('should handle GET_USER_CREDENTIALS_SUCCESS', () => {
    const payload = {
      name: 'name',
      email: 'email',
      getUserProcessing: false,
      isLoggedIn: true,
    };
    expect(
      getUserCredentialsReducer(initialState, {
        type: GET_USER_CREDENTIALS_SUCCESS,
        ...payload,
      }),
    ).toEqual({
      ...initialState,
      ...payload,
    });
  });

  it('should handle GET_USER_CREDENTIALS_FAILURE', () => {
    const payload = {
      getUserProcessing: false,
      getUserFailure: true,
      showFailureMessage: true,
      failureMessage: 'err message',
      isLoggedIn: false,
    };
    expect(
      getUserCredentialsReducer(initialState, {
        type: GET_USER_CREDENTIALS_FAILURE,
        ...payload,
      }),
    ).toEqual({
      ...initialState,
      ...payload,
    });
  });

  it('should handle USER_LOGOUT', () => {
    expect(
      getUserCredentialsReducer(initialState, {
        type: USER_LOGOUT,
      }),
    ).toEqual({
      initialState,
    });
  });

  it('should handle USER_RESET_FAILURE', () => {
    expect(
      getUserCredentialsReducer(initialState, {
        type: USER_RESET_FAILURE,
      }),
    ).toEqual({
      ...initialState,
      showFailureMessage: false,
      failureMessage: null,
    });
  });
});
