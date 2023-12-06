import {
  GET_USER_CREDENTIALS,
  GET_USER_CREDENTIALS_SUCCESS,
  GET_USER_CREDENTIALS_FAILURE,
  USER_LOGOUT,
  USER_RESET_FAILURE,
} from '../../utils/constants';
import { TApplicationActions } from "../actions/types";

export interface IUserState {
  name: string,
  email: string,
  getUserProcessing: boolean,
  getUserFailure: boolean,
  showFailureMessage: boolean,
  failureMessage: string | null,
  isLoggedIn: boolean,
}

const initialState: IUserState = {
  name: '',
  email: '',
  getUserProcessing: false,
  getUserFailure: false,
  showFailureMessage: false,
  failureMessage: null,
  isLoggedIn: false,
};

const getUserCredentialsReducer = (state = initialState, action: TApplicationActions) => {
  switch (action.type) {
    case GET_USER_CREDENTIALS : {
      return {
        ...state,
        getUserProcessing: true,
        getUserFailure: false,
      };
    }
    case GET_USER_CREDENTIALS_SUCCESS : {
      return {
        ...state,
        name: action.name,
        email: action.email,
        getUserProcessing: false,
        isLoggedIn: true,
      };
    }
    case GET_USER_CREDENTIALS_FAILURE : {
      return {
        ...state,
        getUserProcessing: false,
        getUserFailure: true,
        showFailureMessage: true,
        failureMessage: action.failureMessage,
        isLoggedIn: false,
      };
    }
    case USER_LOGOUT : {
      return { initialState };
    }
    case USER_RESET_FAILURE : {
      return {
        ...state,
        showFailureMessage: false,
        failureMessage: null,
      }
    }
    default : {
      return state;
    }
  }
};

export default getUserCredentialsReducer;
