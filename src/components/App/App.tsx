import { useCallback, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Location } from 'react-router-dom';
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
import ModalWithHeader from '../Modals/ModalWithHeader/ModalWithHeader';
import IngredientPage from '../../Pages/Ingredients/Ingredients';
import checkAuth from '../../utils/checkAuth';
import UnAuthRouteElement from '../ProtectedRouteElement/UnAuthRouteElement';
import ProfileData from "../ProfileData/ProfileData";
import ProfileOrders from "../ProfileOrders/ProfileOrders";
import OrderLine from "../../Pages/OrderLine/OrderLine";
import { useDispatch } from "../../services/hooks/reduxHooks";
import LineOrderDetails from "../Modals/LineOrderDetails/LineOrderDetails";
import OrderDetailsPage from "../../Pages/OrderDetails/OrderDetailsPage";
import getIngredients from "../../services/actions/fullIngredientsListActions";
import ModalOrderDetails from "../Modals/ModalOrderDetails/ModalOrderDetails";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundState = location.state as { backgroundLocation: Location }
  const stateRoute = backgroundState && backgroundState.backgroundLocation;

  useEffect(() => {
    checkAuth(dispatch);
  }, []);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  type TCloseModal = () => void;
  const closeModalMAin = useCallback<TCloseModal>(() => {
    navigate('/', {replace: true});
  }, []);

  const closeModalOrderLine = useCallback<TCloseModal>(() => {
    navigate('/feed', {replace: true});
  }, []);

  const closeModalUserOrders = useCallback<TCloseModal>(() => {
    navigate('/profile/orders', {replace: true});
  }, []);

  return (
    <>
      <AppHeader/>
      <Routes location={stateRoute || location}>
        <Route path="/" element={<Main/>}/>
        <Route path="/ingredients/:id" element={<IngredientPage/>}/>
        <Route path="/feed" element={<OrderLine/>}/>
        <Route path="/feed/:number" element={<OrderDetailsPage/>}/>

        <Route path="/login" element={<UnAuthRouteElement element={<Login/>}/>}/>
        <Route path="/register" element={<UnAuthRouteElement element={<Register/>}/>}/>
        <Route path="/forgot-password" element={<UnAuthRouteElement element={<ForgotPassword/>}/>}/>
        <Route path="/reset-password" element={<UnAuthRouteElement element={<ResetPassword/>}/>}/>

        <Route path="/profile" element={<ProtectedRouteElement element={<Profile/>} state={location.state}/>}>
          <Route index element={<ProfileData/>}/>
          <Route path="orders" element={<ProfileOrders/>}/>
        </Route>
        <Route path="/profile/orders/:number" element={<ProtectedRouteElement element={<OrderDetailsPage/>} state={location.state}/>}/>
        <Route path="*" element={<Page404/>}/>
      </Routes>

      {stateRoute && (
        <Routes>
          <Route path="/ingredients/:id" element={
            <ModalWithHeader
              title="Детали ингредиента"
              closeModal={closeModalMAin}
            >
              <IngredientDetails/>
            </ModalWithHeader>
          }/>
          <Route path="/feed/:number" element={
            <ModalOrderDetails
              closeModal={closeModalOrderLine}
            >
              <LineOrderDetails
                scroll={true}
              />
            </ModalOrderDetails>
          }/>
          <Route path="/profile/orders/:number" element={
            <ModalOrderDetails
              closeModal={closeModalUserOrders}
            >
              <LineOrderDetails
                scroll={true}
              />
            </ModalOrderDetails>
          }/>
        </Routes>
      )}
    </>
  );
}

export default App;
