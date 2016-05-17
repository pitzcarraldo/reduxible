'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _contextService = require('../contextService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ReduxibleRouter = function () {
  function ReduxibleRouter(options) {
    (0, _classCallCheck3['default'])(this, ReduxibleRouter);
    var routes = options.routes;
    var container = options.container;
    var errorContainer = options.errorContainer;
    var extras = options.extras;
    var history = options.history;
    var store = options.store;

    this.options = options;
    this.routes = routes;
    this.container = container;
    this.errorContainer = errorContainer;
    this.extras = extras;
    this.history = (0, _reactRouterRedux.syncHistoryWithStore)(history, store);
    this.store = store;
  }

  ReduxibleRouter.prototype.renderServer = function () {
    var ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function () {
      function _callee(location) {
        var _ref, redirectLocation, renderProps, container, store, extras, _extractKeysAndAction, keys, actions, component, _container, _extras;

        return _regenerator2['default'].wrap(function () {
          function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return this.route(this.routes, this.history, location);

                case 3:
                  _ref = _context.sent;
                  redirectLocation = _ref[0];
                  renderProps = _ref[1];
                  container = this.container;
                  store = this.store;
                  extras = this.extras;

                  if (!renderProps) {
                    _context.next = 15;
                    break;
                  }

                  _extractKeysAndAction = this.extractKeysAndActions(renderProps.components);
                  keys = _extractKeysAndAction.keys;
                  actions = _extractKeysAndAction.actions;
                  _context.next = 15;
                  return (0, _contextService.preInitialize)(store, keys, actions);

                case 15:
                  _context.next = 17;
                  return store.dispatch((0, _contextService.removeRequest)());

                case 17:
                  component = this.provide(_react2['default'].createElement(_RouterContext2['default'], renderProps));
                  return _context.abrupt('return', {
                    redirectLocation: redirectLocation,
                    rendered: ReduxibleRouter.renderComponent({ container: container, component: component, store: store, extras: extras })
                  });

                case 21:
                  _context.prev = 21;
                  _context.t0 = _context['catch'](0);
                  _container = this.errorContainer;
                  _extras = this.extras;

                  if (_container) {
                    _context.t0.component = ReduxibleRouter.renderComponent({ container: _container, error: _context.t0, extras: _extras });
                  }
                  throw _context.t0;

                case 27:
                case 'end':
                  return _context.stop();
              }
            }
          }

          return _callee$;
        }(), _callee, this, [[0, 21]]);
      }

      return _callee;
    }()));

    function renderServer(_x) {
      return ref.apply(this, arguments);
    }

    return renderServer;
  }();

  ReduxibleRouter.prototype.renderClient = function () {
    var ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function () {
      function _callee2(container, callback) {
        var router, _ref2, renderProps;

        return _regenerator2['default'].wrap(function () {
          function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  router = void 0;
                  _context2.prev = 1;
                  _context2.next = 4;
                  return this.route(this.routes, this.history, this.getLocation());

                case 4:
                  _ref2 = _context2.sent;
                  renderProps = _ref2[1];

                  router = this.provide(this.getRouter(renderProps));
                  _context2.next = 12;
                  break;

                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2['catch'](1);

                  router = this.provide(this.getRouter({}, this.routes, this.history));

                case 12:
                  _reactDom2['default'].render(router, container, callback);

                case 13:
                case 'end':
                  return _context2.stop();
              }
            }
          }

          return _callee2$;
        }(), _callee2, this, [[1, 9]]);
      }

      return _callee2;
    }()));

    function renderClient(_x2, _x3) {
      return ref.apply(this, arguments);
    }

    return renderClient;
  }();

  ReduxibleRouter.prototype.route = function () {
    function route(routes, history, location) {
      return new _promise2['default'](function (resolve, reject) {
        (0, _match2['default'])({ routes: routes, history: history, location: location }, function (error, redirectLocation, renderProps) {
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
    }

    return route;
  }();

  ReduxibleRouter.prototype.extractKeysAndActions = function () {
    function extractKeysAndActions(components) {
      return components.reduce(function (prev, _ref3) {
        var _prev$actions;

        var key = _ref3.key;
        var initialActions = _ref3.initialActions;

        if (key) prev.keys.push(key); // eslint-disable-line
        if (initialActions) (_prev$actions = prev.actions).push.apply(_prev$actions, initialActions); // eslint-disable-line
        return prev;
      }, { keys: [], actions: [] });
    }

    return extractKeysAndActions;
  }();

  ReduxibleRouter.prototype.provide = function () {
    function provide(children) {
      return _react2['default'].createElement(
        _Provider2['default'],
        { store: this.store, key: 'provider' },
        children
      );
    }

    return provide;
  }();

  ReduxibleRouter.renderComponent = function () {
    function renderComponent(_ref4) {
      var container = _ref4.container;
      var _ref4$component = _ref4.component;
      var component = _ref4$component === undefined ? _react2['default'].createElement('div', null) : _ref4$component;
      var error = _ref4.error;
      var _ref4$store = _ref4.store;
      var store = _ref4$store === undefined ? {} : _ref4$store;
      var _ref4$extras = _ref4.extras;
      var extras = _ref4$extras === undefined ? {} : _ref4$extras;

      var Html = container;
      return '<!doctype html>\n      ' + String(_server2['default'].renderToString(_react2['default'].createElement(Html, (0, _extends3['default'])({ component: component, error: error, store: store }, extras))));
    }

    return renderComponent;
  }();

  ReduxibleRouter.prototype.getLocation = function () {
    function getLocation() {
      var _window$location = window.location;
      var pathname = _window$location.pathname;
      var search = _window$location.search;
      var hash = _window$location.hash;

      return '' + String(pathname) + String(search) + String(hash);
    }

    return getLocation;
  }();

  ReduxibleRouter.prototype.getRouter = function () {
    function getRouter(renderProps, routes, history) {
      return _react2['default'].createElement(_Router2['default'], (0, _extends3['default'])({}, renderProps, { routes: routes, history: history }));
    }

    return getRouter;
  }();

  return ReduxibleRouter;
}();

exports['default'] = ReduxibleRouter;
module.exports = exports['default'];
//# sourceMappingURL=ReduxibleRouter.js.map