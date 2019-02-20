import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { hist } from "./history";

const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducer = combineReducers({
  router: connectRouter(hist)
});

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(routerMiddleware(hist)))
);

export type RootState = ReturnType<typeof reducer>;
