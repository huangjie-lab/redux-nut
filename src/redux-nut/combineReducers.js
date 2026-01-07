// 返回一个总的reducer (prevState,action) => newState

// hasChanged 做个优化 避免每次都重新计算
export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let newState = {};
    let hasChanged = false;

    for (const key in reducers) {
      const reducer = reducers[key];
      newState[key] = reducer(state[key], action); // 每个reducer返回一个新的state

      hasChanged = hasChanged || newState[key] !== state[key];
    }

    hasChanged =
      hasChanged || Object.keys(newState).length !== Object.keys(state).length;

    return hasChanged ? newState : state;
  };
}
