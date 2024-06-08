import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getData } from './utils/core';
import { AUTH_TOKEN_KEY } from './utils/storage';


const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = getData(AUTH_TOKEN_KEY)

  const checkTokenExpired = (exp) => {
    try {
      return exp < Date.now() / 1000;
    } catch {
      return true;
    }
  };

  if (!auth?.auth_token || checkTokenExpired(auth?.exp)) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that location after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
