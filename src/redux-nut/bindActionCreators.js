function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

export default function bindActionCreators(creators, dispatch) {
  let newCreators = {};
  Object.keys(creators).forEach((key) => {
    newCreators[key] = bindActionCreator(creators[key], dispatch);
  });
  return newCreators;
}
