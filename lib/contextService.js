'use strict';

exports.__esModule = true;
exports.REMOVE_REQUEST = exports.INITIALIZE_FAILED = exports.INITIALIZE_SUCCESS = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.initializeSuccess = initializeSuccess;
exports.initializeFailed = initializeFailed;
exports.removeRequest = removeRequest;
exports.preInitialize = preInitialize;
exports.initialActions = initialActions;
exports.reducer = reducer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('./warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var INITIALIZE_SUCCESS = exports.INITIALIZE_SUCCESS = '@@context/INITIALIZE_SUCCESS';
var INITIALIZE_FAILED = exports.INITIALIZE_FAILED = '@@context/INITIALIZE_FAILED';
var REMOVE_REQUEST = exports.REMOVE_REQUEST = '@@context/REMOVE_REQUEST';

function initializeSuccess(keys) {
  return {
    type: INITIALIZE_SUCCESS,
    payload: {
      keys: keys
    }
  };
}

function initializeFailed(keys) {
  return {
    type: INITIALIZE_FAILED,
    payload: {
      keys: keys
    }
  };
}

function removeRequest() {
  return {
    type: REMOVE_REQUEST
  };
}

function isInitialized() {
  var initialized = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return keys.reduce(function (prevInitialized, key) {
    if (!initialized[key]) return initialized[key];
    return prevInitialized;
  }, true);
}

function preInitialize(store) {
  var keys = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var actions = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  if (!keys.length || !actions.length) return _promise2['default'].resolve();
  return new _promise2['default'](function (resolve) {
    var _store$getState = store.getState();

    var initialized = _store$getState.context.initialized;

    if (isInitialized.apply(undefined, [initialized].concat(keys))) return;
    var willDispatch = [].concat(actions, [initializeSuccess(keys)]).map(function (action) {
      return _promise2['default'].resolve(store.dispatch(action));
    });
    _promise2['default'].all(willDispatch).then(resolve)['catch'](function (error) {
      (0, _warning2['default'])('Failed to PreInitialize. Render with initialStates.');
      (0, _warning2['default'])(error.stack);
      return resolve(store.dispatch(initializeFailed(keys)));
    });
  });
}

function initialActions(key) {
  for (var _len2 = arguments.length, actions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    actions[_key2 - 1] = arguments[_key2];
  }

  return function (AsyncInitializedComponent) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
      (0, _inherits3['default'])(Initialize, _Component);

      function Initialize() {
        (0, _classCallCheck3['default'])(this, Initialize);
        return (0, _possibleConstructorReturn3['default'])(this, _Component.apply(this, arguments));
      }

      Initialize.prototype.componentDidMount = function () {
        function componentDidMount() {
          var store = this.context.store;

          preInitialize(store, [key], actions);
        }

        return componentDidMount;
      }();

      Initialize.prototype.render = function () {
        function render() {
          return _react2['default'].createElement(AsyncInitializedComponent, this.props);
        }

        return render;
      }();

      return Initialize;
    }(_react.Component), _class.contextTypes = {
      store: _react.PropTypes.object.isRequired
    }, _class.key = key, _class.initialActions = actions, _temp;
  };
}

function toggleKeys() {
  var initialized = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var keys = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var flag = arguments[2];

  return keys.reduce(function (prevInitialized, key) {
    prevInitialized[key] = flag; // eslint-disable-line
    return prevInitialized;
  }, (0, _extends3['default'])({}, initialized));
}

function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? { initialized: {} } : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var payload = _ref.payload;

  switch (type) {
    case INITIALIZE_SUCCESS:
      return (0, _extends3['default'])({}, state, { initialized: toggleKeys(state.initialized, payload.keys, true) });
    case INITIALIZE_FAILED:
      return (0, _extends3['default'])({}, state, { initialized: toggleKeys(state.initialized, payload.keys, false) });
    case REMOVE_REQUEST:
      {
        var nextState = (0, _extends3['default'])({}, state);
        delete nextState.req;
        return nextState;
      }
    default:
      return state;
  }
}
//# sourceMappingURL=contextService.js.map