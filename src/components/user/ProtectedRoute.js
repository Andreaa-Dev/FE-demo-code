import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(prop) {
  const {
    isUserDataLoading,
    isAuthenticated,
    element,
    // admin
    userData,
    shouldCheckAdmin,
    // productList,
  } = prop;

  if (isUserDataLoading) {
    return <div> Loading... </div>;
  }

  // check if user is admin
  // userData.role
  // user log in  + role = admin
  if (shouldCheckAdmin) {
    return isAuthenticated && userData.role === "Admin" ? (
      element
    ) : (
      <Navigate to="/login" />
    );
  }

  // login
  return isAuthenticated ? element : <Navigate to="/login" />;
}
