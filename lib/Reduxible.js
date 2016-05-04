'use strict';

exports.__esModule = true;
exports['default'] = undefined;

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

var _StoreFactoryImpl = require('./StoreFactoryImpl');

var _StoreFactoryImpl2 = _interopRequireDefault(_StoreFactoryImpl);

var _RouterFactory = require('./RouterFactory');

var _RouterFactory2 = _interopRequireDefault(_RouterFactory);

var _createMemoryHistory = require('react-router/lib/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _reactRouterRedux = require('react-router-redux');

var _warning = require('./warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Reduxible = function () {
  function Reduxible() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3['default'])(this, Reduxible);

    this.config = new _ReduxibleConfig2['default'](options.config || options);
    this.routerFactory = new _RouterFactory2['default'](options);
    this.storeFactory = new _StoreFactoryImpl2['default']((0, _extends3['default'])({}, options, { useDevTools: this.config.useDevTools() }));
  }

  Reduxible.prototype.server = function () {
    function server() {
      var _this = this;

      if (!this.config.isServer()) {
        throw new Error('A server() only can be called in server environment. Please check your config arguments.');
      }
      return function () {
        var ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function () {
          function _callee(req, res, next) {
            var url, history, context, store, router, _ref, redirectLocation, rendered;

            return _regenerator2['default'].wrap(function () {
              function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;

                      if (_this.config.isUniversal()) {
                        _context.next = 3;
                        break;
                      }

                      return _context.abrupt('return', res.send(_this.routerFactory.renderContainer()));

                    case 3:
                      url = req.originalUrl || req.url || '/';
                      history = (0, _createMemoryHistory2['default'])(url);
                      context = { config: _this.config, req: req };
                      store = _this.storeFactory.createStore({ context: context }, (0, _reactRouterRedux.routerMiddleware)(history));
                      router = _this.routerFactory.createRouter(history, store);
                      _context.next = 10;
                      return router.renderServer(url, store);

                    case 10:
                      _ref = _context.sent;
                      redirectLocation = _ref.redirectLocation;
                      rendered = _ref.rendered;

                      if (!redirectLocation) {
                        _context.next = 15;
                        break;
                      }

                      return _context.abrupt('return', res.redirect(redirectLocation.pathname));

                    case 15:
                      return _context.abrupt('return', res.send(rendered));

                    case 18:
                      _context.prev = 18;
                      _context.t0 = _context['catch'](0);

                      (0, _warning2['default'])(_context.t0.stack);

                      if (!_context.t0.component) {
                        _context.next = 24;
                        break;
                      }

                      res.status(500);
                      return _context.abrupt('return', res.send(_context.t0.component));

                    case 24:
                      return _context.abrupt('return', next(_context.t0));

                    case 25:
                    case 'end':
                      return _context.stop();
                  }
                }
              }

              return _callee$;
            }(), _callee, _this, [[0, 18]]);
          }

          return _callee;
        }()));
        return function (_x2, _x3, _x4) {
          return ref.apply(this, arguments);
        };
      }();
    }

    return server;
  }();

  Reduxible.prototype.client = function () {
    function client() {
      var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var container = arguments[1];
      var callback = arguments[2];

      if (!this.config.isClient()) {
        throw new Error('A client() only can be called in browser. Please check your config arguments.');
      }

      if (!container) {
        throw new Error('A container element is empty.');
      }

      var history = void 0;
      try {
        history = this.config.useHashHistory() ? require('react-router/lib/hashHistory') : require('react-router/lib/browserHistory');
      } catch (error) {
        (0, _warning2['default'])('Failed to initialize browser history. Use memory history.');
        history = (0, _createMemoryHistory2['default'])();
      }
      var context = (0, _extends3['default'])({}, initialState.context, { config: this.config });
      var store = this.storeFactory.createStore((0, _extends3['default'])({}, initialState, { context: context }), (0, _reactRouterRedux.routerMiddleware)(history));
      var router = this.routerFactory.createRouter(history, store);
      router.renderClient(container, callback);

      if (this.config.useDevTools()) {
        router.renderClientWithDevTools(container, callback);
      }
    }

    return client;
  }();

  return Reduxible;
}();

exports['default'] = Reduxible;
module.exports = exports['default'];
//# sourceMappingURL=Reduxible.js.map