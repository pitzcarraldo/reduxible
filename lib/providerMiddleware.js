"use strict";

exports.__esModule = true;
exports["default"] = providerMiddleware;
function providerMiddleware() {
  for (var _len = arguments.length, willProvide = Array(_len), _key = 0; _key < _len; _key++) {
    willProvide[_key] = arguments[_key];
  }

  return function (_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;

    return function (next) {
      return function (action) {
        var providers = willProvide.reduce(function (prevProviders, Provider) {
          var provider = new Provider();
          prevProviders[provider.name] = provider.$get(action.context || {});
          return prevProviders;
        }, {});

        if (action.thunk) {
          return action.thunk(dispatch, getState, providers);
        }

        action.providers = providers;
        return next(action);
      };
    };
  };
}
//# sourceMappingURL=providerMiddleware.js.map