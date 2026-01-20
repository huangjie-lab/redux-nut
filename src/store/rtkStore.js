// import { configureStore } from "@reduxjs/toolkit";
import { configureStore } from "../rtk-nut";
import counterReducer from "./counterReducer";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
export default store;
