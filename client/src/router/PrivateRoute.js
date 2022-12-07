import React from "react";
import { Navigate } from "react-router-dom";

// recibe los componentes hijos
export const PrivateRoute = ({ children, uid }) => {
  return !!uid ? children : <Navigate to="/login" />;
};
