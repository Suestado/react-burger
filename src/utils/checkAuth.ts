import { checkAuth as checkAuthApi, refreshToken } from './MainApi';
import { fetchUserProcessing, logOutUser, refreshUser } from '../services/actions/userActions';
import { AppDispatch } from "../services/actions/types";

function checkAuth(dispatch: AppDispatch) {
  dispatch(fetchUserProcessing())
  checkAuthApi(localStorage.getItem('accessToken'))
    .then((res) => {
      dispatch(refreshUser(res.user.name, res.user.email));
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        refreshToken(localStorage.getItem('refreshToken'))
          .then((res) => {
            if (res.success) {
              localStorage.setItem('accessToken', res.accessToken);
              localStorage.setItem('refreshToken', res.refreshToken);
              checkAuthApi(localStorage.getItem('accessToken'))
                .then((res) => {
                  dispatch(refreshUser(res.user.name, res.user.email));
                })
                .catch((err) => {
                  console.log(`При обновлении токена произошла ошибка - ${err.message}`);
                  dispatch(logOutUser());
                });
            }
          })
          .catch((err) => {
            console.log(`При обновлении токена произошла ошибка - ${err.message}`);
            dispatch(logOutUser());
          });
      } else {
        console.log(`При проверке токена произошла ошибка ${err.message}`);
        dispatch(logOutUser());
      }
    });
}

export default checkAuth;
