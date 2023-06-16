import React from "react"
import { Switch, Route } from "react-router-dom";
import { Home } from './templates'


const Router = () => {
  console.log("Router");
  return (
    <Switch>
      <Route path={"(/)?"} component={Home} />
    </Switch>
  );
}

export default Router;
