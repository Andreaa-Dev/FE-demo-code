import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(prop) {
  const { isUserDataLoading, isAuthenticated, element, userData } = prop;

  if (isUserDataLoading) {
    return <div> Loading... </div>;
  }
  return isAuthenticated ? element : <Navigate to="/login" />;
}
