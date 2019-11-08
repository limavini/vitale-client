import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Homepage } from "../pages/Homepage";
import { PatientList } from "../pages/PatientList";

export const HomepageRoute = ({ component: Component,...restProps }) => {
  const {user} = useContext(UserContext);
  
  return (
    <Route
      {...restProps}
      render={props => (user ? <PatientList /> : <Homepage/>)}
    />
  );
};
