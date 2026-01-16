import React, { useEffect, useReducer } from "react";
import store from "../store/rtkStore";
import {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
} from "../store/counterReducer";

export default function ReduxToolkitPage() {
  const { value: count, loading } = store.getState().counter;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // 到哪都需要订阅
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <h3>ReduxToolkitPage</h3>
      <button onClick={() => store.dispatch(increment())}>{count}</button>
      <button onClick={() => store.dispatch(incrementByAmount(100))}>
        每次累加100：{count}
      </button>
      <button onClick={() => store.dispatch({ type: "counter/increment" })}>
        {count}
      </button>
      {/* 说明react-toolkit默认就内置了 redux-thunk 中间件，所以可以直接传递函数作为action */}
      <button
        onClick={() =>
          store.dispatch((dispatch, ...args) => {
            setTimeout(() => {
              dispatch(incrementByAmount(20));
            }, 1000);
          })
        }
      >
        async {count}
      </button>
      <button
        onClick={() => store.dispatch(incrementAsync(10))}
        disabled={loading}
      >
        {loading ? "加载中..." : `异步累加10：${count}`}
      </button>
    </div>
  );
}
