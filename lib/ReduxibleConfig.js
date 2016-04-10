"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ReduxibleConfig = function () {
  function ReduxibleConfig() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3["default"])(this, ReduxibleConfig);

    this.server = !!options.server;
    this.development = !!options.development;
    this.universal = !!options.universal;
    this.hashHistory = !!options.hashHistory;
    this.devTools = !!options.devTools;
  }

  ReduxibleConfig.prototype.isServer = function () {
    function isServer() {
      return this.server;
    }

    return isServer;
  }();

  ReduxibleConfig.prototype.isClient = function () {
    function isClient() {
      return !this.server;
    }

    return isClient;
  }();

  ReduxibleConfig.prototype.isDevelopment = function () {
    function isDevelopment() {
      return this.development;
    }

    return isDevelopment;
  }();

  ReduxibleConfig.prototype.isProduction = function () {
    function isProduction() {
      return !this.development;
    }

    return isProduction;
  }();

  ReduxibleConfig.prototype.isUniversal = function () {
    function isUniversal() {
      return this.universal;
    }

    return isUniversal;
  }();

  ReduxibleConfig.prototype.useDevTools = function () {
    function useDevTools() {
      return this.isClient() && this.isDevelopment() && this.devTools;
    }

    return useDevTools;
  }();

  ReduxibleConfig.prototype.useHashHistory = function () {
    function useHashHistory() {
      return this.isClient() && !this.isUniversal() && this.hashHistory;
    }

    return useHashHistory;
  }();

  return ReduxibleConfig;
}();

exports["default"] = ReduxibleConfig;
module.exports = exports['default'];
//# sourceMappingURL=ReduxibleConfig.js.map