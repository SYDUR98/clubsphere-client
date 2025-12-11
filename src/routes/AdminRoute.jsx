// AdminRoute.jsx
import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../components/Shared/Forbidden";
import { Navigate, useLocation } from "react-router";


const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading, isError } = useRole();
  const location = useLocation();

  // show a centered spinner while auth/role loading
  if (authLoading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span className="loading loading-spinner loading-xl" aria-label="loading" />
      </div>
    );
  }

  
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (isError) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">Failed to verify role. Please try again.</p>
      </div>
    );
  }

  
  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }

  
  return children;
};

export default AdminRoute;
