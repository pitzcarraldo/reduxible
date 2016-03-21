"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReduxibleConfig = function () {
  function ReduxibleConfig() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ReduxibleConfig);

    this.server = !!options.server;
    this.development = !!options.development;
    this.universal = !!options.universal;
    this.hashHistory = !!options.hashHistory;
    this.devTools = !!options.devTools;
  }

  ReduxibleConfig.prototype.isServer = function isServer() {
    return this.server;
  };

  ReduxibleConfig.prototype.isClient = function isClient() {
    return !this.server;
  };

  ReduxibleConfig.prototype.isDevelopment = function isDevelopment() {
    return this.development;
  };

  ReduxibleConfig.prototype.isProduction = function isProduction() {
    return !this.development;
  };

  ReduxibleConfig.prototype.isUniversal = function isUniversal() {
    return this.universal;
  };

  ReduxibleConfig.prototype.useDevTools = function useDevTools() {
    return this.isClient() && this.isDevelopment() && this.devTools;
  };

  ReduxibleConfig.prototype.useHashHistory = function useHashHistory() {
    return this.isClient() && !this.isUniversal() && this.hashHistory;
  };

  return ReduxibleConfig;
}();

exports.default = ReduxibleConfig;
//# sourceMappingURL=ReduxibleConfig.js.map