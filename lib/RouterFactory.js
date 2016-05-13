'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _ReduxibleRouterImpl = require('./ReduxibleRouterImpl');

var _ReduxibleRouterImpl2 = _interopRequireDefault(_ReduxibleRouterImpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RouterFactory = function () {
  function RouterFactory() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3['default'])(this, RouterFactory);

    this.options = options;
    this.validate();
  }

  RouterFactory.prototype.validate = function () {
    function validate() {
      if (this.options.universal && typeof this.options.container !== 'function') {
        throw new Error('A container should to be a react component. Please check your configurations.');
      }
      if (this.options.universal && this.options.errorContainer && typeof this.options.errorContainer !== 'function') {
        throw new Error('A errorContainer has to be a react component. Please check your configurations.');
      }
      if (!this.options.routes) {
        throw new Error('A routes is empty. Please check your configurations.');
      }
    }

    return validate;
  }();

  RouterFactory.prototype.createRouter = function () {
    function createRouter(history, store) {
      return new _ReduxibleRouterImpl2['default']((0, _extends3['default'])({}, this.options, { history: history, store: store }));
    }

    return createRouter;
  }();

  RouterFactory.prototype.renderContainer = function () {
    function renderContainer() {
      var _options = this.options;
      var container = _options.container;
      var extras = _options.extras;

      return _ReduxibleRouterImpl2['default'].renderComponent({ container: container, extras: extras });
    }

    return renderContainer;
  }();

  return RouterFactory;
}();

exports['default'] = RouterFactory;
module.exports = exports['default'];
//# sourceMappingURL=RouterFactory.js.map