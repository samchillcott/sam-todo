import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutes = () => {
  const isAuthenticated = Cookies.get('user');
  return (
    isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  )
};

export default PrivateRoutes;
