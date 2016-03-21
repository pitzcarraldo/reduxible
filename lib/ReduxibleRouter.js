'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _Router = require('react-router/lib/Router');

var _Router2 = _interopRequireDefault(_Router);

var _RouterContext = require('react-router/lib/RouterContext');

var _RouterContext2 = _interopRequireDefault(_RouterContext);

var _match = require('react-router/lib/match');

var _match2 = _interopRequireDefault(_match);

var _Provider = require('react-redux/lib/components/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReduxibleRouter = function () {
  function ReduxibleRouter(options, history, store) {
    (0, _classCallCheck3.default)(this, ReduxibleRouter);

    this.routes = options.routes;
    this.container = options.container;
    this.errorContainer = options.errorContainer;
    this.devTools = options.devTools;
    this.extras = options.extras;
    this.history = (0, _reactRouterRedux.syncHistoryWithStore)(history, store);
    this.store = store;
  }

  ReduxibleRouter.renderComponent = function renderComponent(_ref) {
    var container = _ref.container;
    var _ref$component = _ref.component;
    var component = _ref$component === undefined ? _react2.default.createElement('div', null) : _ref$component;
    var error = _ref.error;
    var _ref$store = _ref.store;
    var store = _ref$store === undefined ? {} : _ref$store;
    var _ref$extras = _ref.extras;
    var extras = _ref$extras === undefined ? {} : _ref$extras;

    var Html = container;
    return '<!doctype html>\n      ' + _server2.default.renderToString(_react2.default.createElement(Html, (0, _extends3.default)({ component: component, error: error, store: store }, extras)));
  };

  ReduxibleRouter.prototype.provide = function provide(children) {
    return _react2.default.createElement(
      _Provider2.default,
      { store: this.store, key: 'provider' },
      children
    );
  };

  ReduxibleRouter.prototype.route = function route(routes, history, location) {
    return new _promise2.default(function (resolve, reject) {
      (0, _match2.default)({ routes: routes, history: history, location: location }, function (error, redirectLocation, renderProps) {
        if (error) {
          return reject(error);
        }

        if (!redirectLocation && !renderProps) {
          return reject(new Error('Failed to route. There is no matching path. Please check your routes configuration.'));
        }

        if (redirectLocation) {
          return resolve([redirectLocation]);
        }

        return resolve([null, renderProps]);
      });
    });
  };

  ReduxibleRouter.prototype.renderServer = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(location) {
      var _ref2, redirectLocation, renderProps, container, store, extras, component, _container, _extras;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this.route(this.routes, this.history, location);

            case 3:
              _ref2 = _context.sent;
              redirectLocation = _ref2[0];
              renderProps = _ref2[1];
              container = this.container;
              store = this.store;
              extras = this.extras;
              component = this.provide(_react2.default.createElement(_RouterContext2.default, renderProps));
              return _context.abrupt('return', {
                redirectLocation: redirectLocation,
                rendered: ReduxibleRouter.renderComponent({ container: container, component: component, store: store, extras: extras })
              });

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](0);
              _container = this.errorContainer;
              _extras = this.extras;

              if (_container) {
                _context.t0.component = ReduxibleRouter.renderComponent({ container: _container, error: _context.t0, extras: _extras });
              }
              throw _context.t0;

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 13]]);
    }));

    function renderServer(_x) {
      return ref.apply(this, arguments);
    }

    return renderServer;
  }();

  ReduxibleRouter.prototype.getLocation = function getLocation() {
    var _window$location = window.location;
    var pathname = _window$location.pathname;
    var search = _window$location.search;
    var hash = _window$location.hash;

    return '' + pathname + search + hash;
  };

  ReduxibleRouter.prototype.getRouter = function getRouter(renderProps, history, routes) {
    return _react2.default.createElement(_Router2.default, (0, _extends3.default)({ history: history, routes: routes }, renderProps));
  };

  ReduxibleRouter.prototype.getRouterWithDevTools = function getRouterWithDevTools(renderProps) {
    var DevTools = this.devTools;
    return _react2.default.createElement(
      'div',
      null,
      this.getRouter(renderProps),
      ' ',
      _react2.default.createElement(DevTools, null)
    );
  };

  ReduxibleRouter.prototype.renderClient = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(container, callback) {
      var router, _ref3, renderProps;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              router = void 0;
              _context2.prev = 1;
              _context2.next = 4;
              return this.route(this.routes, this.history, this.getLocation());

            case 4:
              _ref3 = _context2.sent;
              renderProps = _ref3[1];

              router = this.provide(this.getRouter(renderProps));
              _context2.next = 13;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](1);

              console.error(_context2.t0);
              router = this.provide(this.getRouter({}, this.history, this.routes));

            case 13:
              _reactDom2.default.render(router, container, callback);

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 9]]);
    }));

    function renderClient(_x2, _x3) {
      return ref.apply(this, arguments);
    }

    return renderClient;
  }();

  ReduxibleRouter.prototype.renderClientWithDevTools = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(container, callback) {
      var router, _ref4, renderProps;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              router = void 0;
              _context3.prev = 1;

              window.React = _react2.default;
              _context3.next = 5;
              return this.route(this.routes, this.history, this.getLocation());

            case 5:
              _ref4 = _context3.sent;
              renderProps = _ref4[1];

              router = this.provide(this.getRouterWithDevTools(renderProps));
              _context3.next = 14;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](1);

              console.error(_context3.t0);
              router = this.provide(this.getRouterWithDevTools({}, this.history, this.routes));

            case 14:
              _reactDom2.default.render(router, container, callback);

            case 15:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 10]]);
    }));

    function renderClientWithDevTools(_x4, _x5) {
      return ref.apply(this, arguments);
    }

    return renderClientWithDevTools;
  }();

  return ReduxibleRouter;
}();

exports.default = ReduxibleRouter;
//# sourceMappingURL=ReduxibleRouter.js.map