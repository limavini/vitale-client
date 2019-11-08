import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../UserContext";

export const ProtectedRoute = ({ component: Component, ...restProps }) => {
  const user = useContext(UserContext);
  return (
    <Route
      {...restProps}
      render={props => (user ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};
