"use strict";

exports.__esModule = true;
exports.useQuery = useQuery;

var _apolloClient = require("apollo-client");

var _react = require("react");

var _ApolloContext = require("./ApolloContext");

var _SSRContext = require("./internal/SSRContext");

var _queryCache = require("./queryCache");

var _utils = require("./utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var isInitialLoading = function isInitialLoading(networkStatus) {
  return networkStatus === 1;
};

var isActivelyRefetching = function isActivelyRefetching(networkStatus) {
  return networkStatus === 4;
};

var isPassivelyRefetching = function isPassivelyRefetching(networkStatus) {
  return networkStatus === 2 || networkStatus === 6;
};

var isFetchingMore = function isFetchingMore(networkStatus) {
  return networkStatus === 3;
}; // Error States


var isError = function isError(networkStatus) {
  return networkStatus === 8;
};

var buildStatus = function buildStatus(networkStatus) {
  return {
    initialLoading: isInitialLoading(networkStatus),
    activelyRefetching: isActivelyRefetching(networkStatus),
    passivelyRefetching: isPassivelyRefetching(networkStatus),
    fetchingMore: isFetchingMore(networkStatus),
    error: isError(networkStatus)
  };
};

function useQuery(query, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$ssr = _ref.ssr,
      ssr = _ref$ssr === void 0 ? true : _ref$ssr,
      _ref$skip = _ref.skip,
      skip = _ref$skip === void 0 ? false : _ref$skip,
      _ref$suspend = _ref.suspend,
      suspend = _ref$suspend === void 0 ? false : _ref$suspend,
      pollInterval = _ref.pollInterval,
      _ref$notifyOnNetworkS = _ref.notifyOnNetworkStatusChange,
      notifyOnNetworkStatusChange = _ref$notifyOnNetworkS === void 0 ? true : _ref$notifyOnNetworkS,
      context = _ref.context,
      metadata = _ref.metadata,
      variables = _ref.variables,
      _ref$fetchPolicy = _ref.fetchPolicy,
      actualCachePolicy = _ref$fetchPolicy === void 0 ? 'cache-and-network' : _ref$fetchPolicy,
      errorPolicy = _ref.errorPolicy,
      fetchResults = _ref.fetchResults;

  var client = (0, _ApolloContext.useApolloClient)();
  var ssrManager = (0, _react.useContext)(_SSRContext.SSRContext);
  var ssrInUse = ssr && ssrManager; // Skips when `skip: true` or SSRContext passed but `ssr: false`

  var shouldSkip = skip || ssrManager != null && !ssr;
  var fetchPolicy = ssrInUse && ( // Taken from https://github.com/apollographql/react-apollo/blob/2d7e48b7d0c26e792e1ed26e98bb84d8fba5bb8a/src/Query.tsx#L167-L169
  actualCachePolicy === 'network-only' || actualCachePolicy === 'cache-and-network') ? 'cache-first' : actualCachePolicy;
  var watchQueryOptions = (0, _react.useMemo)(function () {
    return (0, _utils.compact)({
      context: context,
      errorPolicy: errorPolicy,
      fetchPolicy: fetchPolicy,
      fetchResults: fetchResults,
      metadata: metadata,
      notifyOnNetworkStatusChange: notifyOnNetworkStatusChange,
      pollInterval: pollInterval,
      query: query,
      variables: variables
    });
  }, [query, pollInterval, notifyOnNetworkStatusChange, context && (0, _utils.objToKey)(context), metadata && (0, _utils.objToKey)(metadata), variables && (0, _utils.objToKey)(variables), fetchPolicy, errorPolicy, fetchResults]);
  var observableQuery = (0, _react.useMemo)(function () {
    return (0, _queryCache.getCachedObservableQuery)(client, watchQueryOptions);
  }, [client, watchQueryOptions]);

  var _useState = (0, _react.useState)(0),
      responseId = _useState[0],
      setResponseId = _useState[1];

  var currentResult = (0, _react.useMemo)(function () {
    var result = observableQuery.currentResult();
    return {
      data: result.data,
      error: result.errors && result.errors.length > 0 ? new _apolloClient.ApolloError({
        graphQLErrors: result.errors
      }) : result.error,
      errors: result.errors,
      loading: result.loading,
      networkStatus: result.networkStatus,
      partial: result.partial,
      status: buildStatus(result.networkStatus)
    };
  }, [shouldSkip, responseId, observableQuery]);
  (0, _react.useEffect)(function () {
    if (shouldSkip) {
      return;
    }

    var invalidateCurrentResult = function invalidateCurrentResult() {
      return setResponseId(function (x) {
        return x + 1;
      });
    };

    var subscription = observableQuery.subscribe(invalidateCurrentResult, invalidateCurrentResult);
    (0, _queryCache.invalidateCachedObservableQuery)(client, watchQueryOptions);
    return function () {
      subscription.unsubscribe();
    };
  }, [shouldSkip, observableQuery]);
  var helpers = {
    fetchMore: observableQuery.fetchMore.bind(observableQuery),
    refetch: observableQuery.refetch.bind(observableQuery),
    startPolling: observableQuery.startPolling.bind(observableQuery),
    stopPolling: observableQuery.stopPolling.bind(observableQuery),
    updateQuery: observableQuery.updateQuery.bind(observableQuery)
  };

  if (shouldSkip) {
    // Taken from https://github.com/apollographql/react-apollo/blob/5cb63b3625ce5e4a3d3e4ba132eaec2a38ef5d90/src/Query.tsx#L376-L381
    return _extends({}, helpers, {
      data: undefined,
      error: undefined,
      loading: false,
      networkStatus: 1,
      // initialLoading
      status: buildStatus(1)
    });
  }

  if (currentResult.partial) {
    if (suspend) {
      // throw a promise - use the react suspense to wait until the data is
      // available
      throw observableQuery.result();
    }

    if (ssrInUse) {
      ssrManager.register(observableQuery.result());
    }
  }

  return _extends({}, helpers, currentResult);
}