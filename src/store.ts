import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { hist } from "./history";
import { counter } from "./features/CounterPage";

const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducer = combineReducers({
  router: connectRouter(hist),
  counter
});

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(routerMiddleware(hist)))
);

export type RootState = ReturnType<typeof reducer>;
