import React, {FC} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Preloader from '../Preloader/Preloader';

interface IProtectedRouteElement {
  element: React.ReactElement;
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({element: Component}): React.ReactElement => {
  const location = useLocation();
  const {isLoggedIn, getUserProcessing}: {isLoggedIn: boolean, getUserProcessing: boolean} = useSelector((store: any) => store.currentUser);
  const lastPage: { lastPage: string } = {lastPage: location.pathname};

  if (getUserProcessing) {
    return <Preloader/>
  }

  return isLoggedIn ? Component : <Navigate to='/login' state={lastPage}/>
}

export default ProtectedRouteElement;
