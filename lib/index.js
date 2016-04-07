'use strict';

exports.__esModule = true;
exports.initialActions = exports.combineReduxibleReducers = exports.createReducer = exports.createAction = undefined;

var _Reduxible = require('./Reduxible');

var _Reduxible2 = _interopRequireDefault(_Reduxible);

var _utils = require('./utils');

var _contextService = require('./contextService');

var _contextService2 = _interopRequireDefault(_contextService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Reduxible2.default;
exports.createAction = _utils.createAction;
exports.createReducer = _utils.createReducer;
exports.combineReduxibleReducers = _utils.combineReduxibleReducers;
exports.initialActions = _contextService2.default;
//# sourceMappingURL=index.js.map