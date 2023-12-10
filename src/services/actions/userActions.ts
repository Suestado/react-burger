import {
  GET_USER_CREDENTIALS,
  GET_USER_CREDENTIALS_SUCCESS,
  GET_USER_CREDENTIALS_FAILURE,
  USER_LOGOUT,
  USER_RESET_FAILURE,
} from '../../utils/constants';
import { registerUser, loginUser as loginUserApi } from '../../utils/MainApi';
import { AppDispatch } from "./types";

interface IFetchUserProcessingAction {
  readonly type: typeof GET_USER_CREDENTIALS;
}

interface IFetchUserSuccessAction {
  readonly type: typeof GET_USER_CREDENTIALS_SUCCESS;
  name: string;
  email: string;
}

interface IFetchUserFailureAction {
  readonly type: typeof GET_USER_CREDENTIALS_FAILURE;
  failureMessage?: string;
}

interface ILogOutUserAction {
  readonly type: typeof USER_LOGOUT;
}

interface IUserResetFailureAction {
  readonly type: typeof USER_RESET_FAILURE;
}

export type UTUserActions =
  IFetchUserProcessingAction |
  IFetchUserSuccessAction |
  IFetchUserFailureAction |
  ILogOutUserAction |
  IUserResetFailureAction;

const createUser = (name: string, email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_CREDENTIALS,
    });

    return registerUser(name, email, password)
      .then((res) => {
          dispatch({
            type: GET_USER_CREDENTIALS_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_CREDENTIALS_FAILURE,
          failureMessage: err.message,
        });
        console.error(err.message);
      });
  };
}

const loginUser = (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_CREDENTIALS,
    });

    return loginUserApi(email, password)
      .then((res) => {
          dispatch({
            type: GET_USER_CREDENTIALS_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_CREDENTIALS_FAILURE,
          failureMessage: err.message,
        });
        console.error(err);
      });
}

const refreshUser = (name: string, email: string): IFetchUserSuccessAction => ({
  type: GET_USER_CREDENTIALS_SUCCESS,
  name: name,
  email: email,
});

const logOutUser = (): ILogOutUserAction => ({
  type: USER_LOGOUT,
});

const userResetFailure = (): IUserResetFailureAction => ({
  type: USER_RESET_FAILURE,
});

const fetchUserProcessing = (): IFetchUserProcessingAction => ({
  type: GET_USER_CREDENTIALS,
});


export {
  createUser,
  loginUser,
  refreshUser,
  logOutUser,
  userResetFailure,
  fetchUserProcessing,
};
