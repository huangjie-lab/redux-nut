import React, { useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "../react-redux-nut";

export default function ReactReduxHookPage() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const add = useCallback(() => {
    dispatch({ type: "ADD" });
  }, []);

  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <button onClick={add}>{count}</button>
    </div>
  );
}
