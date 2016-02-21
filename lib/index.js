'use strict';

exports.__esModule = true;
exports.providerMiddleware = exports.Provider = exports.combineRouteReducers = exports.createReducer = exports.createAction = undefined;

var _Reduxible = require('./Reduxible');

var _Reduxible2 = _interopRequireDefault(_Reduxible);

var _utils = require('./utils');

var _Provider = require('./Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _providerMiddleware = require('./providerMiddleware');

var _providerMiddleware2 = _interopRequireDefault(_providerMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports.default = _Reduxible2.default;
exports.createAction = _utils.createAction;
exports.createReducer = _utils.createReducer;
exports.combineRouteReducers = _utils.combineRouteReducers;
exports.Provider = _Provider2['default'];
exports.providerMiddleware = _providerMiddleware2['default'];
//# sourceMappingURL=index.js.map