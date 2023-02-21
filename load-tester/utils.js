function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let timed =
  (fn) =>
  (...args) => {
    let start = performance.now();
    let ret = fn(...args);
    let duration = performance.now() - start;
    console.log(`took ${duration} second`);
    return ret;
  };

export { sleep, timed };
