'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var StoreFactory = function () {
  function StoreFactory(options) {
    (0, _classCallCheck3['default'])(this, StoreFactory);

    this.middlewares = options.middlewares || [];
    this.reducers = options.reducers;
    this.reloader = options.reloader;
    this.devTools = options.devTools;
    this.useDevTools = options.useDevTools;
    this.validate();
  }

  StoreFactory.prototype.validate = function () {
    function validate() {
      if (!this.reducers) {
        throw new Error('A reducers is empty. Please check your config arguments.');
      }
    }

    return validate;
  }();

  StoreFactory.prototype.createStore = function () {
    function createStore() {
      var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var finalCreateStore = void 0;

      for (var _len = arguments.length, middlewares = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        middlewares[_key - 1] = arguments[_key];
      }

      var appliedMiddleware = _redux.applyMiddleware.apply(undefined, middlewares.concat(this.middlewares));

      if (this.useDevTools && this.devTools) {
        finalCreateStore = _redux.compose.apply(undefined, [appliedMiddleware].concat(this.devTools.composers()))(_redux.createStore);
      } else {
        finalCreateStore = appliedMiddleware(_redux.createStore);
      }

      var store = finalCreateStore(this.reducers, initialState);

      if (this.reloader) {
        this.reloader(store);
      }
      return store;
    }

    return createStore;
  }();

  return StoreFactory;
}();

exports['default'] = StoreFactory;
module.exports = exports['default'];
//# sourceMappingURL=StoreFactory.js.map