// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
import { createStore, applyMiddleware } from "../redux-nut";

function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(countReducer, applyMiddleware(thunk, logger));
export default store;

// 这个next其实就是在compose中接受的的dispatch 需要返回一个dispatch给后面的中间件
// dispatch = compose(...middlewareChain)(dispatch);
function logger({ getState, dispatch }) {
  return (next) => (action) => {
    // console.log(next, "next");
    // console.log(action, "action");

    const prevState = getState();
    console.log("prevState", prevState);
    next(action);
    const nextState = getState();
    console.log("nextState", nextState);
  };
}

function thunk({ getState, dispatch }) {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}
