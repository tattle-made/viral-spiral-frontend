import _ from "underscore";

function test() {
  var args = _.toArray(arguments);
  console.log(args);
}

test("hi", 23, "hasdf");
