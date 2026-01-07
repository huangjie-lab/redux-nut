import React, { Component } from "react";
import store from "../store";

export default class ReduxPage extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  add = () => {
    store.dispatch({ type: "ADD" });
    console.log(store.getState(), "store");
  };
  minus = () => {
    // store.dispatch({ type: "MINUS" });
    store.dispatch((dispatch, ...args) => {
      console.log(args, "args"); // getState
      setTimeout(() => {
        dispatch({ type: "MINUS" });
      }, 1000);
    });
  };
  promiseMinus = () => {
    store.dispatch({ type: "PROMISE_MINUS" });
  };
  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
        <button onClick={this.promiseMinus}>promiseMinus</button>
      </div>
    );
  }
}
