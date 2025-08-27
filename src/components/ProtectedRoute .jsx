// ProtectedRoute.js
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ children, redirectTo, condition }) => {
  const { isAuthenticated } = useAuth();

  if (condition(isAuthenticated)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
