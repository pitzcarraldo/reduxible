import { combineReducers } from 'redux';
import { routeReducer }  from 'redux-simple-router';

export function combineRouteReducers(reducers) {
  return combineReducers({ ...reducers, routing: routeReducer });
}

const REDUCERS = {};

/**
 * @method
 * @param {Object} initialState - initial state for reducer
 * @param {Object} reducers - list of reducers
 * @returns {Function} reducer - reducer
 */
export function createReducer(initialState = {}, reducers = []) {
  reducers.forEach((reducer) => {
    if (!reducer.types) {
      return;
    }
    reducer.types.forEach((type) => {
      if (!REDUCERS[type]) {
        REDUCERS[type] = [];
      }
      REDUCERS[type].push(reducer);
    });
  });

  return (state = initialState, action) => {
    if (REDUCERS[action.type]) {
      REDUCERS[action.type].forEach((reducer)=> {
        state = { ...reducer.reduce(action.payload, state) };
      });
    }
    return state;
  };
}

/**
 * @method
 * @param {Object} actions - list of action
 * @returns {Function} actionCreatorSelector - actionCreatorSelector
 */
export function createAction(actions) {
  return (type) => {
    return (...args) => {
      let action = {};
      if (actions[type]) {
        switch (typeof actions[type]) {
          case 'function' : {
            action = actions[type](...args);
            break;
          }
          case 'object' : {
            action = actions[type];
            break;
          }
          default :
            action = { payload: actions[type] };
        }
      }
      return {
        ...action,
        type
      };
    };
  };
}
