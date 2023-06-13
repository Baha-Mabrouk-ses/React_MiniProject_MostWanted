import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";

import LocalPage from "./LocalPage";


const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/LocalPage/:uid" component={LocalPage} />
  </Switch>
);

export default Routes;