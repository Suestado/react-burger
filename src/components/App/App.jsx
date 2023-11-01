import { useCallback, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Page404 from '../Page404/Page404';
import Register from '../../Pages/Register/Reegister';
import Login from '../../Pages/Login/Login';
import ForgotPassword from '../../Pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../Pages/ResetPassword/ResetPassword';
import Profile from '../../Pages/Profile/Profile';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import IngredientDetails from '../Modals/IngredientDetails/IngredientDetails';
import Modal from '../Modals/Modal/Modal';
import IngredientPage from '../../Pages/Ingredients/Ingredients';
import checkAuth from '../../utils/checkAuth';
import UnAuthRouteElement from '../ProtectedRouteElement/UnAuthRouteElement';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  let stateRoute = location.state?.backgroundLocation;

  useEffect(() => {
    checkAuth(dispatch);
  }, []);

  const closeModal = useCallback(() => {
    navigate('/', { replace: true });
  }, []);

  return (
    <>
      <AppHeader/>
      <Routes location={stateRoute || location}>
        <Route path="/" element={<Main/>}/>
        <Route path="/ingredients/:id" element={<IngredientPage/>}/>
        <Route path="/login" element={
          <UnAuthRouteElement
            element={<Login/>}
          />}/>
        <Route path="/register" element={
          <UnAuthRouteElement
            element={<Register/>}
          />}/>
        <Route path="/forgot-password" element={
          <UnAuthRouteElement
            element={<ForgotPassword/>}
          />}/>
        <Route path="/reset-password" element={
          <UnAuthRouteElement
            element={<ResetPassword/>}
          />}/>
        <Route path="/profile" element={
          <ProtectedRouteElement
            element={<Profile/>}/>
        }/>
        <Route path="/profile/orders" element={
          <ProtectedRouteElement
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
