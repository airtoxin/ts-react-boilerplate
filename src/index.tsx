import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ConnectedRouter } from "connected-react-router";
import { hist } from "./history";
import { Routes } from "./Routes";
import { setupGlobalCss } from "./boot/globalCss";

const APP_ID = "app";

setupGlobalCss(APP_ID);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={hist}>
      <>
        <Routes />
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById(APP_ID)
);
