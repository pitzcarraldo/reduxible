'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.__esModule = true;

var _ReduxibleRouter = require('./ReduxibleRouter');

var _ReduxibleRouter2 = _interopRequireDefault(_ReduxibleRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RouterFactory = function () {
  function RouterFactory(options) {
    (0, _classCallCheck3.default)(this, RouterFactory);

    this.options = options;
    this.validate();
  }

  RouterFactory.prototype.validate = function validate() {
    if (typeof this.options.container !== 'function') {
      throw new Error('A container has to be a react element factory. Please check your config arguments.');
    }
    if (this.options.errorContainer && typeof this.options.errorContainer !== 'function') {
      throw new Error('A errorContainer has to be a react element factory. Please check your config arguments.');
    }
    if (!this.options.routes) {
      throw new Error('A routes is empty. Please check your config arguments.');
    }
  };

  RouterFactory.prototype.createRouter = function createRouter(history, store) {
    return new _ReduxibleRouter2.default(this.options, history, store);
  };

  RouterFactory.prototype.renderContainer = function renderContainer() {
    var _options = this.options;
    var container = _options.container;
    var extras = _options.extras;

    return _ReduxibleRouter2.default.renderComponent({ container: container, extras: extras });
  };

  return RouterFactory;
}();

exports.default = RouterFactory;
//# sourceMappingURL=RouterFactory.js.map