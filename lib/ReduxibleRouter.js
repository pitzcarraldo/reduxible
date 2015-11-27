'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _reduxSimpleRouter = require('redux-simple-router');

var _DevTools = require('./DevTools');

var _DevTools2 = _interopRequireDefault(_DevTools);

var ReduxibleRouter = (function () {
  function ReduxibleRouter(routes, store, history) {
    _classCallCheck(this, ReduxibleRouter);

    this.routes = routes;
    this.store = store;
    this.history = history;
    _reduxSimpleRouter.syncReduxAndRouter(this.history, this.store);
  }

  ReduxibleRouter.prototype.route = function route(location, callback) {
    var _this = this;

    _reactRouter.match({ routes: this.routes, location: location }, function (error, redirectLocation, renderProps) {
      if (error) {
        return callback(error);
      }

      if (redirectLocation) {
        return callback(null, redirectLocation);
      }

      if (renderProps) {
        return callback(null, null, _this._provide(_react2['default'].createElement(_reactRouter.RoutingContext, renderProps)));
      }

      return callback();
    });
  };

  ReduxibleRouter.prototype.render = function render() {
    return this._provide(this._getRouter());
  };

  ReduxibleRouter.prototype.renderDevTools = function renderDevTools() {
    return this._provide(this._getDevToolsRouter());
  };

  ReduxibleRouter.prototype._provide = function _provide(children) {
    return _react2['default'].createElement(
      _reactRedux.Provider,
      { store: this.store, key: 'provider' },
      children
    );
  };

  ReduxibleRouter.prototype._getRouter = function _getRouter() {
    return _react2['default'].createElement(_reactRouter.Router, { history: this.history, routes: this.routes });
  };

  ReduxibleRouter.prototype._getDevToolsRouter = function _getDevToolsRouter() {
    return _react2['default'].createElement(
      'div',
      null,
      this._getRouter(),
      _react2['default'].createElement(_DevTools2['default'], null)
    );
  };

  return ReduxibleRouter;
})();

exports['default'] = ReduxibleRouter;
module.exports = exports['default'];