import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { userRoutes } from "../../routes/mainRoutes/mainRoutes";

const MainContainer = () => {
  return (
    <>
      <Switch>
        {userRoutes.map((route) =>
          route.component ? (
            <Route
              key={route.name}
              path={route.path}
              exact={route.exact}
              name={route.name}
            >
              <route.component />
            </Route>
          ) : (
            route.redirectRoute && <Redirect key={route.name} to={route.path} />
          )
        )}
      </Switch>
    </>
  );
};

export default MainContainer;
