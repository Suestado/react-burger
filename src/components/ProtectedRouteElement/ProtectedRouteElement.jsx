import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ProtectedRouteElement({ element: Component, ...props }) {
  const location = useLocation();
  const { isLoggedIn } = useSelector((store) => store.currentUser);
  const lastPage = { lastPage: location.pathname };

  return isLoggedIn ?  Component : <Navigate to='/login' state={lastPage}/>
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  props: PropTypes.object,
};

export default ProtectedRouteElement;
