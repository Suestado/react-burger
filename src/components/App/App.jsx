import { useCallback, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import IngredientDetails from '../Modals/IngredientDetails/IngredientDetails';
import Modal from '../Modals/Modal/Modal';
import IngredientPage from '../IngredientPage/IngredientPage';

function App() {
  const { isLoggedIn } = useSelector((store) => store.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let location = useLocation();
  let stateRoute = location.state?.backgroundLocation;

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

  const closeModal = useCallback(() => {
    navigate('/', {replace: true});
  }, []);

  return (
    <>
      <AppHeader/>
      <Routes location={stateRoute || location}>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/ingredients/:id" element={<IngredientPage/>}/>
        <Route path="/profile" element={
          <ProtectedRouteElement
            isLoggedIn={isLoggedIn}
            element={<Profile/>}/>
        }/>
        <Route path="/profile/orders" element={
          <ProtectedRouteElement
            isLoggedIn={isLoggedIn}
            element={<Profile/>}/>
        }/>
        <Route path="*" element={<Page404/>}/>
      </Routes>

      {stateRoute && (
        <Routes>
          <Route path="/ingredients/:id" element={
            <Modal
              title="Детали ингредиента"
              closeModal={closeModal}
            >
              <IngredientDetails/>
            </Modal>
          }/>
        </Routes>
      )}
    </>
  );
}

export default App;
