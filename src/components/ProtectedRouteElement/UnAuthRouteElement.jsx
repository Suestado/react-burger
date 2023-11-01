import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';

function UnAuthRouteElement({ element: Component}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, getUserProcessing } = useSelector((store) => store.currentUser);
  const from = location.state?.lastPage;

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

UnAuthRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default UnAuthRouteElement;
