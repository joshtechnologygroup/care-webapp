import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getTokenCookie } from "Src/services/CookieService";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (getTokenCookie()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};


export default ProtectedRoute;
