import React, {FC} from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Preloader from '../Preloader/Preloader';

interface IUnAuthRouteElement {
  element: React.ReactElement;
}

const UnAuthRouteElement: FC<IUnAuthRouteElement> = ({ element: Component}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, getUserProcessing }: { isLoggedIn: boolean, getUserProcessing: boolean } = useSelector((store: any) => store.currentUser);
  const from: string | undefined = location.state?.lastPage;

  if(getUserProcessing) {
    return <Preloader/>
  }

  if(!isLoggedIn) {
    return Component;
  }

  if(isLoggedIn && from) {
    return <Navigate to={from}/>
  }

  if(isLoggedIn && !from) {
    navigate(-1)
  }
}

export default UnAuthRouteElement;
