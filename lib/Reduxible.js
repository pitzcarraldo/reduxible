'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _ReduxibleConfig = require('./ReduxibleConfig');

var _ReduxibleConfig2 = _interopRequireDefault(_ReduxibleConfig);

var _StoreFactory = require('./StoreFactory');

var _StoreFactory2 = _interopRequireDefault(_StoreFactory);

var _RouterFactory = require('./RouterFactory');

var _RouterFactory2 = _interopRequireDefault(_RouterFactory);

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createHashHistory = require('history/lib/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _createMemoryHistory = require('history/lib/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _contextMiddlerware = require('./contextMiddlerware');

var _contextMiddlerware2 = _interopRequireDefault(_contextMiddlerware);

var _warning = require('./warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Reduxible = function () {
  function Reduxible() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Reduxible);

    this.config = new _ReduxibleConfig2.default(options.config || options);
    this.routerFactory = new _RouterFactory2.default(options);
    this.storeFactory = new _StoreFactory2.default((0, _extends3.default)({}, options, { useDevTools: this.config.useDevTools() }));
    this.initialActions = options.initialActions || [];
  }

  Reduxible.prototype.server = function server() {
    var _this2 = this;

    if (!this.config.isServer()) {
      throw new Error('A server() only can be called in server environment. Please check your config arguments.');
    }
    return function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
        var history, store, router, url, _ref, redirectLocation, rendered;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (_this2.config.isUniversal()) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', res.send(_this2.routerFactory.renderContainer()));

              case 3:
                history = (0, _createMemoryHistory2.default)();
                store = _this2.storeFactory.createStore({}, [(0, _contextMiddlerware2.default)({ config: _this2.config, history: history, req: req, res: res, next: next })]);
                _context.next = 7;
                return _this2.preInitialize(store);

              case 7:
                router = _this2.routerFactory.createRouter(history, store);
                url = req.originalUrl || req.url || '/';
                _context.next = 11;
                return router.renderServer(url, store);

              case 11:
                _ref = _context.sent;
                redirectLocation = _ref.redirectLocation;
                rendered = _ref.rendered;

                if (!redirectLocation) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt('return', res.redirect(redirectLocation.pathname));

              case 16:
                return _context.abrupt('return', res.send(rendered));

              case 19:
                _context.prev = 19;
                _context.t0 = _context['catch'](0);


                (0, _warning2.default)(_context.t0.stack);

                if (!_context.t0.component) {
                  _context.next = 25;
                  break;
                }

                res.status(500);
                return _context.abrupt('return', res.send(_context.t0.component));

              case 25:
                return _context.abrupt('return', next(_context.t0));

              case 26:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 19]]);
      })),
          _this = _this2;
      return function (_x2, _x3, _x4) {
        return ref.apply(_this, arguments);
      };
    }();
  };

  Reduxible.prototype.preInitialize = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(store) {
      var willDispatch;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              willDispatch = this.initialActions.map(function (action) {
                return _promise2.default.resolve(store.dispatch(action));
              });
              _context2.next = 4;
              return _promise2.default.all(willDispatch);

            case 4:
              return _context2.abrupt('return', _context2.sent);

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](0);

              (0, _warning2.default)('Failed to PreInitialize. Render with initialStates.');
              (0, _warning2.default)(_context2.t0.stack);

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 7]]);
    }));
    return function preInitialize(_x5) {
      return ref.apply(this, arguments);
    };
  }();

  Reduxible.prototype.client = function client() {
    var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var container = arguments[1];
    var callback = arguments[2];

    if (!this.config.isClient()) {
      throw new Error('A client() only can be called in browser. Please check your config arguments.');
    }

    if (!container) {
      throw new Error('A container element is empty.');
    }

    var history = undefined;
    try {
      history = this.config.useHashHistory() ? (0, _createHashHistory2.default)() : (0, _createBrowserHistory2.default)();
    } catch (error) {
      (0, _warning2.default)('Failed to initialize browser history. Use memory history.');
      history = (0, _createMemoryHistory2.default)();
    }
    var store = this.storeFactory.createStore(initialState, [(0, _contextMiddlerware2.default)({ config: this.config, history: history })]);
    var router = this.routerFactory.createRouter(history, store);

    router.renderClient(container, callback);

    if (this.config.useDevTools()) {
      router.renderClientWithDevTools(container, callback);
    }
  };

  return Reduxible;
}();

exports.default = Reduxible;
//# sourceMappingURL=Reduxible.js.map