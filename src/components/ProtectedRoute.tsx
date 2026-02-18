import React from "react";
import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useUser();
  const location = useLocation();
  const token = Cookies.get('auth_token');

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 