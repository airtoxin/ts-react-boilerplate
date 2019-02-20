import React from "react";
import { connect } from "react-redux";
import { AnyAction, Reducer } from "redux";
import { RootState } from "../store";

export interface Props {
  count: number;
  onIncrement: (count: number) => any;
  onReset: () => any;
}

export class CounterPageComponent extends React.Component<Props> {
  render() {
    return (
      <div>
        <div>count: {this.props.count}</div>
        <button onClick={this.handleClickIncrement}>increment</button>
      </div>
    );
  }

  private handleClickIncrement = () => this.props.onIncrement(1);
}

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

export interface IncrementAction extends AnyAction {
  type: "counterPage/IncrementAction";
  payload: {
    amount: number;
  };
}

export const increment = (amount: number): IncrementAction => ({
  type: "counterPage/IncrementAction",
  payload: { amount }
});

export interface ResetAction extends AnyAction {
  type: "counterPage/ResetAction";
}

export const reset = (): ResetAction => ({
  type: "counterPage/ResetAction"
});

export type CounterAction = IncrementAction | ResetAction;

export const counter: Reducer<CounterState, CounterAction> = (state = initialState, action) => {
  switch (action.type) {
    case "counterPage/IncrementAction": return { ...state, count: state.count + action.payload.amount };
    case "counterPage/ResetAction": return initialState;
    default:
      return state;
  }
};

export const CounterPage = connect<any, any, any, RootState>(
  state => ({ count: state.counter.count }),
  dispatch => ({
    onIncrement: (amount: number) => dispatch(increment(amount)),
    onDecrement: () => dispatch(reset()),
  })
)(CounterPageComponent);
