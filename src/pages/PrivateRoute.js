import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// replace with Navigate 
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
import { useUserContext } from '../context/user_context';

// children - it grabs the children, which is whatever component that we pass inside PrivateRoute. (in this case, Checkout component.)
// rest - when we are working with function params (this is not spread!). it gathers anything that we pass in it.
const PrivateRoute = ({ children, ...rest }) => {
  // get user from Auth0
  const { user } = useAuth0();

  // return (
  //   // first, spread our props using ...rest
  //   // second, use special prop 'render' to render components conditionally.
  //   <Route {...rest} render={() => {
  //     return user ? children : <Redirect to='/'></Redirect>
  //   }}>
  //   </Route>
  // )

  // refactored to:
  if (!user) {
    return <Navigate to='/' />
  }
  return children;
};
export default PrivateRoute;
