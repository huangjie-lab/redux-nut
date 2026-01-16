import { useState } from "react";
import ReduxPage from "./pages/ReduxPage";
import ReactReduxPage from "./pages/ReactReduxPage";
import ReactReduxHookPage from "./pages/ReactReduxHookPage";
import "./redux-nut/compose";

export default function App(props) {
  // return <ReduxPage />;
  // return <ReactReduxPage />;
  return <ReactReduxHookPage />;
}
