import _ from "underscore";

/**
 * example use cases :
 *  existy(null) => false
 *  existy(undefined) => false
 *  existy({}.noExistingFunction) => false
 *  existy((function(){})()) => false
 *  existy(0) => true
 *  existy (false) => true
 * @param {*} x
 * @returns
 */
function existy(x) {
  return x != null;
}

/**
 * example use cases :
 *  truthy(false) => false
 *  truthy(undefined) => false
 *  truthy(0) => true
 *  truthy('') => true
 * @param {} x
 * @returns
 */
function truthy(x) {
  return x !== false && existy(x);
}

function doWhen(cond, fun) {
  if (truthy(cond)) {
    return fun();
  } else {
    return undefined;
  }
}

const Logger = {
  fail: (message) => {
    throw new Error(["ERROR :", message].join(" "));
  },

  warn: (message) => {
    console.log(["WARNING :", message].join(" "));
  },

  info: (message) => {
    console.log(["INFO :", message].join(" "));
  },
};

function invoker(name, method) {
  return function (target) {
    if (!existy(target)) Logger.fail("Must provide a target");

    var targetMethod = target[name];
    var args = _.rest(arguments);
    return doWhen(existy(targetMethod) && method === targetMethod, () => {
      return targetMethod.apply(target, args);
    });
  };
}

let rev = invoker("reverse", Array.prototype.reverse);

// console.log(invoker())
console.log(
  _.map(
    [
      [1, 2, 3],
      [4, 5, 6],
    ],
    rev
  )
);

export { existy, truthy, Logger, invoker };
