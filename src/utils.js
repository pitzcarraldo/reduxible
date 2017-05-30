import { combineReducers } from 'redux';
import { routeReducer as routing }  from 'react-router-redux';

export function combineRouteReducers(reducers) {
  return combineReducers({ ...reducers, routing });
}

/**
 * @method
 * @param {...*} args - (actions) or (namespace, actions)
 * @returns {Function} actionCreatorSelector - actionCreatorSelector
 */
export function createAction(...args) {
  const namespace = args[1] && `${args[0]}/` || '';
  const actions = args[1] || args[0];
  const action = type =>
    (...args) => {
      let action = {};

      if (actions[type]) {
        switch (typeof actions[type]) {
          case 'function' :
            {
              action = actions[type](...args);
              break;
            }
          case 'object' :
            {
              action = actions[type];
              break;
            }
          default :
            action = { payload: actions[type] };
        }
      }

      if (typeof action === 'function') {
        return action;
      }

      return {
        ...action,
        type: namespace + type
      };
    };
  action.type = type => namespace + type;
  return action;
}

/**
 * @method
 * @param {Object} initialState - initial state for reducer
 * @param {Object} reducers - list of reducers
 * @returns {Function} reducer - reducer
 */
export function createReducer(initialState = {}, reducers = []) {
  const REDUCERS = reducers.reduce((reducers, reducer) => {
    if (!reducer.types || !reducer.types.length) {
      return reducers;
    }
    return reducer.types.reduce((prevReducers, type) => {
      prevReducers[type] = prevReducers[type] || [];
      prevReducers[type].push(reducer.reduce);
      return prevReducers;
    }, reducers);
  }, {});

  return (state = initialState, action) => {
    if (!REDUCERS[action.type]) {
      return state;
    }
    return REDUCERS[action.type].reduce(
      (prevState, reduce) => ({ ...reduce(action, prevState) }), state
    );
  };
}
