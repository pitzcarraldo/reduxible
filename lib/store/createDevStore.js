'use strict';

exports.__esModule = true;

exports['default'] = function () {
  var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var extraMiddlewares = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var middlewares = [].concat(this.middlewares, extraMiddlewares);

  var appliedMiddleware = _redux.applyMiddleware.apply(undefined, middlewares);

  var enhancer = void 0;
  if (this.useDevTools) {
    if (!this.devTools.composers) {
      throw new Error('The devTools should have composers as function.');
    }
    enhancer = _redux.compose.apply(undefined, [appliedMiddleware].concat(this.devTools.composers()));
  } else {
    enhancer = appliedMiddleware;
  }

  var store = (0, _redux.createStore)(this.reducers, initialState, enhancer);

  if (this.reloader) {
    this.reloader(store);
  }

  return store;
};

var _redux = require('redux');

module.exports = exports['default'];
//# sourceMappingURL=createDevStore.js.map