import { combineReducers } from 'redux';
import { routeReducer }  from 'redux-simple-router';

export function combineRouteReducers(reducers) {
  return combineReducers({ ...reducers, routing: routeReducer });
}

/**
 * @method
 * @param {Object} initialState - initial state for reducer
 * @param {Object} actions - list of action
 * @returns {Function} reducer - reducer
 */
export function createReducer(initialState = {}, actions = {}) {
  /**
   * @method
   * @param {Object} state - exist state
   * @param {Object} dispatched - dispatched action
   * @returns {Object} state - reduced state
   */
  return (state = initialState, dispatched) => {
    const action = actions[dispatched.type];
    if (action) {
      return { ...state, ...action.reducer(dispatched.payload, state) };
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
      if (actions[type] && actions[type].creator) {
        action = actions[type].creator(...args);
      }
      return {
        ...action,
        type
      };
    };
  };
}


