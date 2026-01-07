import compose from "./compose";

export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let { dispatch, getState } = store;

    // todo 加强dispatch

    const midAPI = {
      getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    // middleware 是一个函数 返回一个函数接受的参数是dispatch 并再次返回一个加强后的dispatch
    // middleware(midAPI) => (next) => (action) => {
    //     console.log("middleware", action);
    //     next(action);
    // }
    const middlewareChain = middlewares.map((middleware) => middleware(midAPI));

    dispatch = compose(...middlewareChain)(dispatch);

    return {
      ...store,
      // 加强后的dispatch
      dispatch,
    };
  };
}
