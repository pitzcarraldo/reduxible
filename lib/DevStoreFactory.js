'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _redux = require('redux');

var _StoreFactory2 = require('./StoreFactory.js');

var _StoreFactory3 = _interopRequireDefault(_StoreFactory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DevStoreFactory = function (_StoreFactory) {
  (0, _inherits3['default'])(DevStoreFactory, _StoreFactory);

  function DevStoreFactory(options) {
    (0, _classCallCheck3['default'])(this, DevStoreFactory);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _StoreFactory.call(this, options));

    _this.reloader = options.reloader;
    _this.devTools = options.devTools;
    _this.useDevTools = options.useDevTools;
    return _this;
  }

  DevStoreFactory.prototype.createStore = function () {
    function createStore() {
      var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var extraMiddlewares = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      var middlewares = [].concat(this.middlewares, extraMiddlewares);

      var appliedMiddleware = _redux.applyMiddleware.apply(undefined, middlewares);

      var enhancer = void 0;
      if (this.useDevTools && this.devTools) {
        enhancer = _redux.compose.apply(undefined, [appliedMiddleware].concat(this.devTools.composers()));
      } else {
        enhancer = appliedMiddleware;
      }

      var store = (0, _redux.createStore)(this.reducers, initialState, enhancer);

      if (this.reloader) {
        this.reloader(store);
      }

      return store;
    }

    return createStore;
  }();

  return DevStoreFactory;
}(_StoreFactory3['default']);

exports['default'] = DevStoreFactory;
module.exports = exports['default'];
//# sourceMappingURL=DevStoreFactory.js.map