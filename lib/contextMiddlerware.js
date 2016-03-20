"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports["default"] = contextMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function contextMiddleware(context) {
  return function () {
    return function (next) {
      return function (action) {
        return next((0, _extends3["default"])({}, action, { context: context }));
      };
    };
  };
}
//# sourceMappingURL=contextMiddlerware.js.map