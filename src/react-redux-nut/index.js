import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import { bindActionCreators } from "../redux-nut";

// 1. 创建context对象
const Context = React.createContext();

// 2. Provider组件传递value
export const Provider = ({ store, children }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

// 3.后代消费Provider传递下来的value
// * contextType 只能用在类组件，只能订阅单一的context来源
// * useContext 只能用在类组件或者自定义Hook中
// * Consumer 没有组件限制，注意使用方式

export const connect =
  (mapStateToProps, mapDispatchToProps) => (WrapperComponent) => (props) => {
    const { getState, dispatch, subscribe } = useStore();
    let stateProps = mapStateToProps(getState());
    let dispatchProps = { dispatch };

    if (typeof mapDispatchToProps === "function") {
      dispatchProps = mapDispatchToProps(dispatch);
    } else if (typeof mapDispatchToProps === "object") {
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
    }

    // const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const forceUpdate = useForceUpdate();

    useLayoutEffect(() => {
      const unsubscribe = subscribe(() => {
        forceUpdate();
      });
      return unsubscribe;
    }, [subscribe, forceUpdate]);
    return <WrapperComponent {...stateProps} {...dispatchProps} {...props} />;
  };

export const useSelector = (selector) => {
  const { getState, subscribe } = useStore();
  const selectedState = selector(getState());
  const forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    });
    return unsubscribe;
  }, [subscribe, forceUpdate]);
  return selectedState;
};

export const useDispatch = () => {
  const store = useContext(Context);
  const { dispatch } = store;
  return dispatch;
};

// 抽离一个forceUpdate函数和获取store的函数
function useForceUpdate() {
  const [, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  return update;
}

function useStore() {
  return useContext(Context);
}
