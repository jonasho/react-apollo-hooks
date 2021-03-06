"use strict";

exports.__esModule = true;
var _exportNames = {
  FetchResult: true
};
exports.FetchResult = void 0;

var _useQuery = require("./useQuery");

Object.keys(_useQuery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _useQuery[key];
});

var _useMutation = require("./useMutation");

Object.keys(_useMutation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _useMutation[key];
});

var _ApolloContext = require("./ApolloContext");

Object.keys(_ApolloContext).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _ApolloContext[key];
});

var _utils = require("./utils");

exports.FetchResult = _utils.FetchResult;

var _SuspenseSSR = require("./SuspenseSSR");

Object.keys(_SuspenseSSR).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _SuspenseSSR[key];
});

var _getMarkupFromTree = require("./getMarkupFromTree");

Object.keys(_getMarkupFromTree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _getMarkupFromTree[key];
});