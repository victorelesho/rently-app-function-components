import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import auth from '../../services/authService';

const RequireAuth = ({ children, redirectTo }) => {
   const location = useLocation();

   const isAuthenticated = auth.getCurrentUser();
   return isAuthenticated 
      ? children 
      : <Navigate to={redirectTo} state={{ from: location }} />;
}
 
export default RequireAuth;