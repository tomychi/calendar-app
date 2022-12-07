import React from "react";
import { Navigate } from "react-router-dom";

// recibe los componentes hijos
export const PublicRoute = ({ children, uid }) => {
  return !!uid ? <Navigate to="/" /> : children;
};
