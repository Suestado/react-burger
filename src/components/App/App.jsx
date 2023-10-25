import { useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Page404 from '../Page404/Page404';
import Register from '../Pages/Register/Reegister';
import Login from '../Pages/Login/Login';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword/ResetPassword';
import Profile from '../Pages/Profile/Profile';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import MainApi from '../../utils/MainApi';
import { refreshUser, logOutUser } from '../../services/actions/userActions';

function App() {
  const { isLoggedIn } = useSelector((store) => store.currentUser);
  const dispatch = useDispatch();

  const checkAuth = useCallback(() => {
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
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <>
          <AppHeader/>
          <Main/>
        </>
      }/>

      <Route path="/login" element={
        <>
          <AppHeader/>
          <Login/>
        </>
      }/>

      <Route path="/register" element={
        <>
          <AppHeader/>
          <Register/>
        </>
      }/>

      <Route path="/forgot-password" element={
        <>
          <AppHeader/>
          <ForgotPassword/>
        </>
      }/>

      <Route path="/reset-password" element={
        <>
          <AppHeader/>
          <ResetPassword/>
        </>
      }
      />

      <Route path="/profile" element={
        <ProtectedRouteElement
          isLoggedIn={isLoggedIn}
          element={
            <>
              <AppHeader/>
              <Profile/>
            </>
          }/>
      }/>

      <Route path="/profile/orders" element={
        <ProtectedRouteElement
          isLoggedIn={isLoggedIn}
          element={
            <>
              <AppHeader/>
              <Profile/>
            </>
          }/>
      }/>

      <Route path="/ingredients/:id" element={
        <>
        </>
      }/>

      <Route path="*" element={
        <Page404/>
      }/>
    </Routes>
  );
}

export default App;
