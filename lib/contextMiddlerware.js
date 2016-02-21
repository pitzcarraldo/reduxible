"use strict";

exports.__esModule = true;
exports["default"] = contextMiddleware;
function contextMiddleware(context) {
  return function () {
    return function (next) {
      return function (action) {
        action.context = context;
        return next(action);
      };
    };
  };
}
//# sourceMappingURL=contextMiddlerware.js.map