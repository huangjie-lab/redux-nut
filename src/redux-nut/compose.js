function fn1(arg) {
  console.log("fn1", arg);
  return arg;
}
function fn2(arg) {
  console.log("fn2", arg);
  return arg;
}
function fn3(arg) {
  console.log("fn3", arg);
  return arg;
}
export default function compose(...fns) {
  if (fns.length === 0) {
    return (arg) => arg;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
