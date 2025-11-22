import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useCheckAuth } from "@/Services/auth/useAuth";
import SuspenseLoader from "@/components/Loaders/SuspenseLoader";




export const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {


  const location = useLocation();
  const { data: isAuthenticated, isLoading: isChecking, isError } = useCheckAuth();



  // Show loader while checking auth status
  if (isChecking) return <SuspenseLoader fullScreen text="Loading.." />;


  // If not authenticated → redirect to /auth
  if (isError || !isAuthenticated?.is_logged_in) {  
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }


  // Otherwise, render the protected content
  return <>{children}</>;


};
