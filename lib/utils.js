'use strict';

exports.__esModule = true;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.combineRouteReducers = combineRouteReducers;
exports.createAction = createAction;
exports.createReducer = createReducer;

var _redux = require('redux');

var _reduxSimpleRouter = require('redux-simple-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function combineRouteReducers(reducers) {
  return (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, { routing: _reduxSimpleRouter.routeReducer }));
}

/**
 * @method
 * @param {...*} args - (actions) or (namespace, actions)
 * @returns {Function} actionCreatorSelector - actionCreatorSelector
 */
function createAction() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var namespace = args[1] && args[0] + '/' || '';
  var actions = args[1] || args[0];
  var action = function action(type) {
    return function () {
      var action = {};

      if (actions[type]) {
        switch ((0, _typeof3.default)(actions[type])) {
          case 'function':
            {
              action = actions[type].apply(actions, arguments);
              break;
            }
          case 'object':
            {
              action = actions[type];
              break;
            }
          default:
            action = { payload: actions[type] };
        }
      }

      if (typeof action === 'function') {
        return action;
      }

      return (0, _extends3.default)({}, action, {
        type: namespace + type
      });
    };
  };
  action.type = function (type) {
    return namespace + type;
  };
  return action;
}

/**
 * @method
 * @param {Object} initialState - initial state for reducer
 * @param {Object} reducers - list of reducers
 * @returns {Function} reducer - reducer
 */
function createReducer() {
  var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var reducers = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var REDUCERS = reducers.reduce(function (reducers, reducer) {
    if (!reducer.types || !reducer.types.length) {
      return reducers;
    }
    return reducer.types.reduce(function (prevReducers, type) {
      prevReducers[type] = prevReducers[type] || [];
      prevReducers[type].push(reducer.reduce);
      return prevReducers;
    }, reducers);
  }, {});

  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    if (!REDUCERS[action.type]) {
      return state;
    }
    return REDUCERS[action.type].reduce(function (prevState, reduce) {
      return (0, _extends3.default)({}, reduce(action, prevState));
    }, state);
  };
}
//# sourceMappingURL=utils.js.map