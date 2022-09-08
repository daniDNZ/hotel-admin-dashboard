import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';

type RequireAuthProps = {
  children: JSX.Element;
}

function RequireAuth({ children }: RequireAuthProps) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  if (!auth.status) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
