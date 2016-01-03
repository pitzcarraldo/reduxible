import { combineReducers } from 'redux';
import { routeReducer }  from 'redux-simple-router';

export function combineRouteReducers(reducers) {
  return combineReducers({ ...reducers, routing: routeReducer });
}

/**
 * @method
 * @param {Object} initialState - initial state for reducer
 * @param {Object} reducers - list of reducers
 * @returns {Function} reducer - reducer
 */
export function createReducer(initialState = {}, reducers = []) {
  /**
   * @method
   * @param {Object} state - exist state
   * @param {Object} dispatched - dispatched action
   * @returns {Object} state - reduced state
   */
  return (state = initialState, dispatched) => {
    const toReduce = reducers.filter((reducer)=> {
      return reducer.types.indexOf(dispatched.type) > -1;
    });
    for (let reducer of toReduce) {
      state = { ...state, ...reducer.reduce(dispatched.payload, state) };
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
        switch(typeof actions[type]) {
          case 'function' : {
            action = actions[type](...args);
            break;
          }
          case 'object' : {
            action = actions[type];
            break;
          }
          default : {
            action = { payload : actions[type] };
          }
        }
      }
      return {
        ...action,
        type
      };
    };
  };
}
