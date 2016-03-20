import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

export function combineRouteReducers(reducers) {
  return combineReducers({ ...reducers, routing: routeReducer });
}

/**
 * @method
 * @param {...*} args - (actions) or (namespace, actions)
 * @returns {Function} actionCreatorSelector - actionCreatorSelector
 */
export function createAction(...args) {
  const namespace = args[1] && `${args[0]}/` || '';
  const actions = args[1] || args[0];
  const reduxAction = type =>
    (...actionArgs) => {
      let action = {};

      if (actions[type]) {
        switch (typeof actions[type]) {
          case 'function' :
            {
              action = actions[type](...actionArgs);
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
  reduxAction.type = type => namespace + type;
  return reduxAction;
}

/**
 * @method
 * @param {Object} initialState - initial state for reducer
 * @param {Object} reducers - list of reducers
 * @returns {Function} reducer - reducer
 */
export function createReducer(initialState = {}, reducers = []) {
  const REDUCERS = reducers.reduce((currentReducers, reducer) => {
    if (!reducer.types || !reducer.types.length) {
      return currentReducers;
    }
    return reducer.types.reduce((prevReducers, type) => {
      const nextReducers = { ...prevReducers };
      nextReducers[type] = prevReducers[type] || [];
      nextReducers[type].push(reducer.reduce);
      return nextReducers;
    }, currentReducers);
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
