"use strict";

exports.__esModule = true;
exports.objToKey = objToKey;

var _lodash = _interopRequireDefault(require("lodash.isplainobject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function objToKey(obj) {
  if (!(0, _lodash.default)(obj)) {
    return obj;
  }

  var sortedObj = Object.keys(obj).sort().reduce(function (result, key) {
    result[key] = objToKey(obj[key]);
    return result;
  }, {});
  return JSON.stringify(sortedObj);
}