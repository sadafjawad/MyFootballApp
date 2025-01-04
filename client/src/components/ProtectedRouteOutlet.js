import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth';

const ProtectedRouteOutlet = () => {
  const { isLoggedIn } = useAuth();
  const byPassLogin = true;

  if (!isLoggedIn && !byPassLogin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRouteOutlet;
