import {
  GET_USER_CREDENTIALS,
  GET_USER_CREDENTIALS_SUCCESS,
  GET_USER_CREDENTIALS_FAILURE,
  USER_LOGOUT,
} from '../../utils/constants';

const initialState = {
  name: null,
  email: null,
  getUserProcessing: false,
  getUserFailure: false,
  isLoggedIn: false,
};

const getUserCredentialsReducer = (state = initialState, action) => {
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
        isLoggedIn: false,
      };
    }
    case USER_LOGOUT : {
      return { initialState };
    }
    default : {
      return state;
    }
  }
};

export default getUserCredentialsReducer;
