import MainApi from './MainApi';
import { logOutUser, refreshUser } from '../services/actions/userActions';

function checkAuth(dispatch) {
  MainApi.checkAuth(localStorage.getItem('accessToken'))
    .then((res) => {
      dispatch(refreshUser(res.user.name, res.user.email));
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        MainApi.refreshToken(localStorage.getItem('refreshToken'))
          .then((res) => {
            if (res.success) {
              localStorage.setItem('accessToken', res.accessToken);
              localStorage.setItem('refreshToken', res.refreshToken);
              MainApi.checkAuth(localStorage.getItem('accessToken'))
                .then((res) => {
                  dispatch(refreshUser(res.user.name, res.user.email));
                })
                .catch((err) => {
                  console.log(`При обновлении токена произошла ошибка - ${err.message}`);
                });
            }
          })
          .catch((err) => {
            console.log(`При обновлении токена произошла ошибка - ${err.message}`);
          });
      } else {
        console.log(`При проверке токена произошла ошибка ${err.message}`);
        dispatch(logOutUser());
      }
    });
}

export default checkAuth;
