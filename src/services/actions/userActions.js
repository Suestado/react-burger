import {
  GET_USER_CREDENTIALS,
  GET_USER_CREDENTIALS_SUCCESS,
  GET_USER_CREDENTIALS_FAILURE,
  USER_LOGOUT,
} from '../../utils/constants';
import MainApi from '../../utils/MainApi';

function createUser(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_CREDENTIALS,
    });

    MainApi.registerUser(name, email, password)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_USER_CREDENTIALS_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
        } else {
          dispatch({
            type: GET_USER_CREDENTIALS_FAILURE,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_CREDENTIALS_FAILURE,
        });
        console.error(err.message);
      });
  };
}

function loginUser(email, password) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_CREDENTIALS,
    });

    MainApi.loginUser(email, password)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_USER_CREDENTIALS_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
        } else {
          dispatch({
            type: GET_USER_CREDENTIALS_FAILURE,
          });
        }
      })

      .catch((err) => {
        dispatch({
          type: GET_USER_CREDENTIALS_FAILURE,
        });
        console.error(err);
      });
  };
}

const refreshUser = (name, email) => ({
  type: GET_USER_CREDENTIALS_SUCCESS,
  name: name,
  email: email,
})

const logOutUser = () => ({
  type: USER_LOGOUT,
})


export {
  createUser,
  loginUser,
  refreshUser,
  logOutUser
};