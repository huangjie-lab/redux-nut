import React, { Component } from "react";
// import { connect } from "react-redux";
import { connect } from "../react-redux-nut";
import { bindActionCreators } from "../redux-nut";

// mapStateToProps = (state) => ({ count: state.count });
// mapDispatchToProps 存在对象形式和函数形式
export default connect(
  ({ count }) => ({ count }),
  (dispatch) => {
    let creators = {
      add: () => ({ type: "ADD" }),
      minus: () => ({ type: "MINUS" }),
    };
    creators = bindActionCreators(creators, dispatch);
    return { dispatch, ...creators };
  }
  //   {
  //     add: () => ({ type: "ADD" }),
  //     minus: () => ({ type: "MINUS" }),
  //   }
)(
  class ReactReduxPage extends Component {
    render() {
      const { dispatch, count, add, minus } = this.props;
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <button
            onClick={() => {
              dispatch({ type: "ADD" });
            }}
          >
            dispatch:{count}
          </button>
          <button onClick={add}>add: {count}</button>
          <button onClick={minus}>minus: {count}</button>
        </div>
      );
    }
  }
);
