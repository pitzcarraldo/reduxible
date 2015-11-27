'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactDomServer = require('react-dom/server');

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

var _ReduxibleRouter = require('./ReduxibleRouter');

var _ReduxibleRouter2 = _interopRequireDefault(_ReduxibleRouter);

var _StoreFactory = require('./StoreFactory');

var _StoreFactory2 = _interopRequireDefault(_StoreFactory);

var _historyLibCreateBrowserHistory = require('history/lib/createBrowserHistory');

var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);

var _historyLibCreateMemoryHistory = require('history/lib/createMemoryHistory');

var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);

var Reduxible = (function () {
  function Reduxible() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Reduxible);

    this.config = options.config;
    this.container = options.container;
    this.errorContainer = options.errorContainer;
    this.routes = options.routes;
    this.storeFactory = new _StoreFactory2['default'](_extends({}, options));
  }

  Reduxible.prototype.server = function server() {
    var _this = this;

    var store = this.storeFactory.createStore();
    var history = _historyLibCreateMemoryHistory2['default']();
    var router = new _ReduxibleRouter2['default'](this.routes, store, history);
    return function (req, res) {
      if (!_this.config.isUniversal()) {
        return res.send(_this._renderContainer('', store));
      }

      router.route(req.originalUrl, function (error, redirectLocation, component) {
        if (error) {
          res.status(500);
          if (_this.errorContainer) {
            return res.send(_this._renderContainer(_this.errorContainer, store));
          }
          return res.send(_this._renderContainer(error, store));
        }

        if (redirectLocation) {
          return res.redirect(redirectLocation.pathname);
        }

        return res.send(_this._renderContainer(component, store));
      });
    };
  };

  Reduxible.prototype._renderContainer = function _renderContainer(component, store) {
    var Html = this.container;
    return '<!doctype html>\n' + _reactDomServer2['default'].renderToString(_react2['default'].createElement(Html, { component: component, store: store }));
  };

  Reduxible.prototype.client = function client(initialState, dest) {
    var store = this.storeFactory.createStore(initialState);
    var history = _historyLibCreateBrowserHistory2['default']();
    var router = new _ReduxibleRouter2['default'](this.routes, store, history);
    _reactDom2['default'].render(router.render(), dest);
    if (this.config.useDevTools()) {
      window.React = _react2['default'];
      _reactDom2['default'].render(router.renderDevTools(), dest);
    }
  };

  return Reduxible;
})();

exports['default'] = Reduxible;
module.exports = exports['default'];