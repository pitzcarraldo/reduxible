'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var StoreFactory = function () {
  function StoreFactory(options) {
    (0, _classCallCheck3['default'])(this, StoreFactory);

    this.options = options;
    this.middlewares = options.middlewares || [];
    this.reducers = options.reducers;
    this.reloader = options.reloader;
    this.devTools = options.devTools;
    this.useDevTools = options.useDevTools;
    this.validate();
    this.createStore = this.getCreateStore();
  }

  StoreFactory.prototype.validate = function () {
    function validate() {
      if (!this.reducers) {
        throw new Error('A reducers is empty. Please check your config arguments.');
      }
    }

    return validate;
  }();

  StoreFactory.prototype.getCreateStore = function () {
    function getCreateStore() {
      if (process.env.NODE_ENV !== 'production') {
        return require('./createDevStore');
      }
      return require('./createStore');
    }

    return getCreateStore;
  }();

  return StoreFactory;
}();

exports['default'] = StoreFactory;
module.exports = exports['default'];
//# sourceMappingURL=StoreFactory.js.map