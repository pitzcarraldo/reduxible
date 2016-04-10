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

var _contextService = require('./contextService');

var _warning = require('./warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ReduxibleRouter = function () {
  function ReduxibleRouter(options, history, store) {
    (0, _classCallCheck3['default'])(this, ReduxibleRouter);

    this.routes = options.routes;
    this.container = options.container;
    this.errorContainer = options.errorContainer;
    this.devTools = options.devTools;
    this.extras = options.extras;
    this.history = (0, _reactRouterRedux.syncHistoryWithStore)(history, store);
    this.store = store;
  }

  ReduxibleRouter.prototype.renderServer = function () {
    var ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function () {
      function _callee(location) {
        var _ref, redirectLocation, renderProps, container, store, extras, component, _container, _extras;

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
                    _context.next = 12;
                    break;
                  }

                  _context.next = 12;
                  return this.preInitialize(store, renderProps.components);

                case 12:
                  component = this.provide(_react2['default'].createElement(_RouterContext2['default'], renderProps));
                  return _context.abrupt('return', {
                    redirectLocation: redirectLocation,
                    rendered: ReduxibleRouter.renderComponent({ container: container, component: component, store: store, extras: extras })
                  });

                case 16:
                  _context.prev = 16;
                  _context.t0 = _context['catch'](0);
                  _container = this.errorContainer;
                  _extras = this.extras;

                  if (_container) {
                    _context.t0.component = ReduxibleRouter.renderComponent({ container: _container, error: _context.t0, extras: _extras });
                  }
                  throw _context.t0;

                case 22:
                case 'end':
                  return _context.stop();
              }
            }
          }

          return _callee$;
        }(), _callee, this, [[0, 16]]);
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
        var _this = this;

        var router, components, _ref2, renderProps;

        return _regenerator2['default'].wrap(function () {
          function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  router = void 0;
                  components = [];
                  _context2.prev = 2;
                  _context2.next = 5;
                  return this.route(this.routes, this.history, this.getLocation());

                case 5:
                  _ref2 = _context2.sent;
                  renderProps = _ref2[1];

                  components.push.apply(components, renderProps.components);
                  router = this.provide(this.getRouter(renderProps));
                  _context2.next = 15;
                  break;

                case 11:
                  _context2.prev = 11;
                  _context2.t0 = _context2['catch'](2);

                  (0, _warning2['default'])(_context2.t0);
                  router = this.provide(this.getRouter({}, this.routes, this.history));

                case 15:
                  _reactDom2['default'].render(router, container, function () {
                    _this.preInitialize(_this.store, components);
                    if (callback) callback();
                  });

                case 16:
                case 'end':
                  return _context2.stop();
              }
            }
          }

          return _callee2$;
        }(), _callee2, this, [[2, 11]]);
      }

      return _callee2;
    }()));

    function renderClient(_x2, _x3) {
      return ref.apply(this, arguments);
    }

    return renderClient;
  }();

  ReduxibleRouter.prototype.renderClientWithDevTools = function () {
    var ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function () {
      function _callee3(container, callback) {
        var _this2 = this;

        var router, components, _ref3, renderProps;

        return _regenerator2['default'].wrap(function () {
          function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  router = void 0;
                  components = [];
                  _context3.prev = 2;

                  window.React = _react2['default'];
                  _context3.next = 6;
                  return this.route(this.routes, this.history, this.getLocation());

                case 6:
                  _ref3 = _context3.sent;
                  renderProps = _ref3[1];

                  components.push.apply(components, renderProps.components);
                  router = this.provide(this.getRouterWithDevTools(renderProps));
                  _context3.next = 16;
                  break;

                case 12:
                  _context3.prev = 12;
                  _context3.t0 = _context3['catch'](2);

                  (0, _warning2['default'])(_context3.t0);
                  router = this.provide(this.getRouterWithDevTools({}, this.routes, this.history));

                case 16:
                  _reactDom2['default'].render(router, container, function () {
                    _this2.preInitialize(_this2.store, components);
                    if (callback) callback();
                  });

                case 17:
                case 'end':
                  return _context3.stop();
              }
            }
          }

          return _callee3$;
        }(), _callee3, this, [[2, 12]]);
      }

      return _callee3;
    }()));

    function renderClientWithDevTools(_x4, _x5) {
      return ref.apply(this, arguments);
    }

    return renderClientWithDevTools;
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

  ReduxibleRouter.prototype.preInitialize = function () {
    function preInitialize(store, components) {
      var _this3 = this;

      return new _promise2['default'](function (resolve) {
        var _store$getState = store.getState();

        var initialized = _store$getState.context.initialized;

        if (initialized) return;
        var initialActions = [].concat(_this3.extractActions(components), [(0, _contextService.initialize)()]);
        var willDispatch = initialActions.map(function (action) {
          return _promise2['default'].resolve(store.dispatch(action));
        });
        _promise2['default'].all(willDispatch).then(resolve)['catch'](function (error) {
          (0, _warning2['default'])('Failed to PreInitialize. Render with initialStates.');
          (0, _warning2['default'])(error.stack);
          return resolve(store.dispatch((0, _contextService.initialize)(false)));
        });
      });
    }

    return preInitialize;
  }();

  ReduxibleRouter.prototype.extractActions = function () {
    function extractActions(components) {
      return components.reduce(function (prevActions, _ref4) {
        var initialActions = _ref4.initialActions;

        if (initialActions) {
          prevActions.push.apply(prevActions, initialActions); // eslint-disable-line
        }
        return prevActions;
      }, []);
    }

    return extractActions;
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
    function renderComponent(_ref5) {
      var container = _ref5.container;
      var _ref5$component = _ref5.component;
      var component = _ref5$component === undefined ? _react2['default'].createElement('div', null) : _ref5$component;
      var error = _ref5.error;
      var _ref5$store = _ref5.store;
      var store = _ref5$store === undefined ? {} : _ref5$store;
      var _ref5$extras = _ref5.extras;
      var extras = _ref5$extras === undefined ? {} : _ref5$extras;

      var Html = container;
      var state = store && store.getState && (0, _extends3['default'])({}, store.getState()) || {};
      if (state && state.context && state.context.req) delete state.context.req;
      return '<!doctype html>\n      ' + String(_server2['default'].renderToString(_react2['default'].createElement(Html, (0, _extends3['default'])({ component: component, error: error, store: store, state: state }, extras))));
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

  ReduxibleRouter.prototype.getRouterWithDevTools = function () {
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

  return ReduxibleRouter;
}();

exports['default'] = ReduxibleRouter;
module.exports = exports['default'];
//# sourceMappingURL=ReduxibleRouter.js.map