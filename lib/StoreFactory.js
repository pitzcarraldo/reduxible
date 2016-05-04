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
      var extraMiddlewares = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      var middlewares = [].concat(this.middlewares, extraMiddlewares);

      var enhancer = _redux.applyMiddleware.apply(undefined, middlewares);
      return (0, _redux.createStore)(this.reducers, initialState, enhancer);
    }

    return createStore;
  }();

  return StoreFactory;
}();

exports['default'] = StoreFactory;
module.exports = exports['default'];
//# sourceMappingURL=StoreFactory.js.map