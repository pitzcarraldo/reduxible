'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _warning = require('./warning');

var _warning2 = _interopRequireDefault(_warning);

var _ReduxibleRouter2 = require('./ReduxibleRouter');

var _ReduxibleRouter3 = _interopRequireDefault(_ReduxibleRouter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DevReduxibleRouter = function (_ReduxibleRouter) {
  (0, _inherits3['default'])(DevReduxibleRouter, _ReduxibleRouter);

  function DevReduxibleRouter(options) {
    (0, _classCallCheck3['default'])(this, DevReduxibleRouter);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _ReduxibleRouter.call(this, options));

    _this.devTools = options.devTools;
    return _this;
  }

  DevReduxibleRouter.prototype.renderClientWithDevTools = function () {
    var ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function () {
      function _callee(container, callback) {
        var router, _ref, renderProps;

        return _regenerator2['default'].wrap(function () {
          function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  router = void 0;
                  _context.prev = 1;

                  window.React = _react2['default'];
                  _context.next = 5;
                  return this.route(this.routes, this.history, this.getLocation());

                case 5:
                  _ref = _context.sent;
                  renderProps = _ref[1];

                  router = this.provide(this.getRouterWithDevTools(renderProps));
                  _context.next = 14;
                  break;

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context['catch'](1);

                  (0, _warning2['default'])(_context.t0);
                  router = this.provide(this.getRouterWithDevTools({}, this.routes, this.history));

                case 14:
                  _reactDom2['default'].render(router, container, callback);

                case 15:
                case 'end':
                  return _context.stop();
              }
            }
          }

          return _callee$;
        }(), _callee, this, [[1, 10]]);
      }

      return _callee;
    }()));

    function renderClientWithDevTools(_x, _x2) {
      return ref.apply(this, arguments);
    }

    return renderClientWithDevTools;
  }();

  DevReduxibleRouter.prototype.getRouterWithDevTools = function () {
    function getRouterWithDevTools(renderProps, routes, history) {
      var DevTools = this.devTools;
      return _react2['default'].createElement(
        'div',
        null,
        this.getRouter(renderProps, routes, history),
        ' ',
        _react2['default'].createElement(DevTools, null)
      );
    }

    return getRouterWithDevTools;
  }();

  return DevReduxibleRouter;
}(_ReduxibleRouter3['default']);

exports['default'] = DevReduxibleRouter;
module.exports = exports['default'];
//# sourceMappingURL=DevReduxibleRouter.js.map