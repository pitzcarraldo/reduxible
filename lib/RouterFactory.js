'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _ReduxibleRouter = require('./ReduxibleRouter');

var _ReduxibleRouter2 = _interopRequireDefault(_ReduxibleRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouterFactory = function () {
  function RouterFactory() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, RouterFactory);

    this.options = options;
    this.validate();
  }

  RouterFactory.prototype.validate = function validate() {
    if (typeof this.options.container !== 'function') {
      throw new Error('A container should to be a react component. Please check your configurations.');
    }
    if (this.options.errorContainer && typeof this.options.errorContainer !== 'function') {
      throw new Error('A errorContainer has to be a react component. Please check your configurations.');
    }
    if (!this.options.routes) {
      throw new Error('A routes is empty. Please check your configurations.');
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