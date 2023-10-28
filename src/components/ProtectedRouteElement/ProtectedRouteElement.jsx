import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'

function ProtectedRouteElement({element: Component, ...props}) {
  const location = useLocation()
  const lastPage = { lastPage: location.pathname }

  return(
    props.isLoggedIn ? Component : <Navigate to='/login' state={lastPage}/>
  )
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  props: PropTypes.object,
}

export default ProtectedRouteElement;
