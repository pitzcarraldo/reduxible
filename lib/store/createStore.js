'use strict';

exports.__esModule = true;

exports['default'] = function () {
  var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var extraMiddlewares = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var middlewares = [].concat(this.middlewares, extraMiddlewares);

  var enhancer = _redux.applyMiddleware.apply(undefined, middlewares);
  return (0, _redux.createStore)(this.reducers, initialState, enhancer);
};

var _redux = require('redux');

module.exports = exports['default'];
//# sourceMappingURL=createStore.js.map