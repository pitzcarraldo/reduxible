'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports['default'] = combineReduxibleReducers;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _contextService = require('./contextService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function combineReduxibleReducers(reducers) {
  return (0, _redux.combineReducers)((0, _extends3['default'])({}, reducers, { context: _contextService.reducer, routing: _reactRouterRedux.routerReducer }));
}
module.exports = exports['default'];
//# sourceMappingURL=combineReduxibleReducers.js.map