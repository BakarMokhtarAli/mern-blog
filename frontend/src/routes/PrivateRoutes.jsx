import React from "react";
import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to={"/login"} />;
};
