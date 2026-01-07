export default function createStore(reducer) {
  let currentState;
  let currentListeners = [];
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach((listener) => listener());
  }
  function subscribe(listener) {
    currentListeners.push(listener);
    return () => {
      currentListeners = currentListeners.filter((l) => l !== listener);
    };
  }

  dispatch({ type: "@xxxxx" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
