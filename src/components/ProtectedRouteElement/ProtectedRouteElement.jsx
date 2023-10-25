import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRouteElement({element: Component, ...props}) {
  const location = useLocation()
  const lastPage = { lastPage: location.pathname }

  return(
    props.isLoggedIn ? Component : <Navigate to='/login' state={lastPage}/>
  )
}

export default ProtectedRouteElement;
