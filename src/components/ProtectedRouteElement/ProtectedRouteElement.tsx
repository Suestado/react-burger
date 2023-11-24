import React, {FC} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { useSelector } from "../../services/hooks/reduxHooks";

interface IProtectedRouteElement {
  element: React.ReactElement;
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({element: Component}) => {
  const location = useLocation();
  const {isLoggedIn, getUserProcessing}: {isLoggedIn: boolean, getUserProcessing: boolean} = useSelector((store) => store.currentUser);
  const lastPage: { lastPage: string } = {lastPage: location.pathname};

  if (getUserProcessing) {
    return <Preloader/>
  }

  return isLoggedIn ? Component : <Navigate to='/login' state={lastPage}/>
}

export default ProtectedRouteElement;
