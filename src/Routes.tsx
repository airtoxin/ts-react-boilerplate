import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { AppPage } from "./features/AppPage";

export class Routes extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact={true} path="/" component={AppPage} />
          <Route component={this.RootRedirect} />
        </Switch>
      </>
    );
  }

  RootRedirect = () => <Redirect to="/" />;
}
