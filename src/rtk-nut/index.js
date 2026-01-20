import { combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { applyMiddleware } from "redux";
import createSlice from "./createSlice";

export function configureStore({ reducer }) {
  const rootReducer = combineReducers(reducer);

  const store = createStore(rootReducer, applyMiddleware(reduxThunk));

  return store;
}

export { createSlice };
