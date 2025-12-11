import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../components/Shared/Forbidden";

const ManagerRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading, isError } = useRole();
  const location = useLocation();

  // Loading spinner
  if (authLoading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span
          className="loading loading-spinner loading-xl"
          aria-label="loading"
        />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Error fetching role
  if (isError) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">
          Failed to verify role. Please try again.
        </p>
      </div>
    );
  }

  // Trim invisible characters just before comparison
  const trimmedRole = role?.trim();

  // Role check
  if (trimmedRole !== "manager" && trimmedRole !== "clubManager") {
    return <Forbidden />;
  }

  return children;
};

export default ManagerRoute;
