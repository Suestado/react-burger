import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function UnAuthRouteElement({ element: Component, ...props }) {
  const location = useLocation();
  const { isLoggedIn } = useSelector((store) => store.currentUser);
  const from = location.state?.lastPage || '/';

  return !isLoggedIn ?  Component : <Navigate to={from}/>
}

UnAuthRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  props: PropTypes.object,
};

export default UnAuthRouteElement;
