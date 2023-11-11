import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';

function ProtectedRouteElement({ element: Component }) {
  const location = useLocation();
  const { isLoggedIn, getUserProcessing } = useSelector((store) => store.currentUser);
  const lastPage = { lastPage: location.pathname };

  if(getUserProcessing) {
    return <Preloader/>
  }

  return isLoggedIn ?  Component : <Navigate to='/login' state={lastPage}/>
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRouteElement;
