import React, {FC} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { useSelector } from "../../services/hooks/reduxHooks";

interface IProtectedRouteElement {
  element: React.ReactElement;
  state?: any;
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({element: Component, state}) => {
  const location = useLocation();
  const {isLoggedIn, getUserProcessing}: {isLoggedIn: boolean, getUserProcessing: boolean} = useSelector((store) => store.currentUser);
  const redirectPage: string = state?.modalLocation.pathname ? state?.modalLocation.pathname : location.pathname
  const lastPage: { lastPage: string } = {lastPage: redirectPage};

  if (getUserProcessing) {
    return <Preloader/>
  }

  return isLoggedIn ? Component : <Navigate to='/login' state={lastPage}/>
}

export default ProtectedRouteElement;
