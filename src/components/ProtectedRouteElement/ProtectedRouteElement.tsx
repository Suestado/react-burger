import React, {FC} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';

interface IProtectedRouteElement {
  element: React.ReactNode | React.ReactElement
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({element: Component}) => {
  const location = useLocation();
  const {isLoggedIn, getUserProcessing} = useSelector((store: any) => store.currentUser);
  const lastPage: { lastPage: string } = {lastPage: location.pathname};

  if (getUserProcessing) {
    return <Preloader/>
  }

  return isLoggedIn ? Component : <Navigate to='/login' state={lastPage}/>
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRouteElement;
