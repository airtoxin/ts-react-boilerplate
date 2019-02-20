import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { AppPage } from "./features/AppPage";
import { CounterPage } from "./features/CounterPage";

export class Routes extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact={true} path="/" component={AppPage} />
          <Route exact={true} path="/counter" component={CounterPage} />
          <Route component={this.RootRedirect} />
        </Switch>
      </>
    );
  }

  RootRedirect = () => <Redirect to="/" />;
}
