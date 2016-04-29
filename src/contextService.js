import React, { Component, PropTypes } from 'react';
import warning from './warning';

export const INITIALIZE_SUCCESS = '@@context/INITIALIZE_SUCCESS';
export const INITIALIZE_FAILED = '@@context/INITIALIZE_FAILED';
export const REMOVE_REQUEST = '@@context/REMOVE_REQUEST';

export function initializeSuccess(keys) {
  return {
    type: INITIALIZE_SUCCESS,
    payload: {
      keys
    }
  };
}

export function initializeFailed(keys) {
  return {
    type: INITIALIZE_FAILED,
    payload: {
      keys
    }
  };
}

export function removeRequest() {
  return {
    type: REMOVE_REQUEST
  };
}

function isInitialized(initialized = {}, ...keys) {
  return keys.reduce(
    (prevInitialized, key) => {
      if (!initialized[key]) return initialized[key];
      return prevInitialized;
    }, true);
}


export function preInitialize(store, keys = [], actions = []) {
  if (!keys.length || !actions.length) return Promise.resolve();
  return new Promise(resolve => {
    const { context: { initialized } } = store.getState();
    if (isInitialized(initialized, ...keys)) return;
    const willDispatch = [...actions, initializeSuccess(keys)]
      .map(action => Promise.resolve(store.dispatch(action)));
    Promise.all(willDispatch)
      .then(resolve)
      .catch(error => {
        warning('Failed to PreInitialize. Render with initialStates.');
        warning(error.stack);
        return resolve(store.dispatch(initializeFailed(keys)));
      });
  });
}

export function initialActions(key, ...actions) {
  return AsyncInitializedComponent =>
    class Initialize extends Component {
      static contextTypes = {
        store: PropTypes.object.isRequired
      };

      static key = key;
      static initialActions = actions;

      componentDidMount() {
        const { store } = this.context;
        preInitialize(store, [key], actions);
      }

      render() {
        return <AsyncInitializedComponent {...this.props} />;
      }
    };
}

function toggleKeys(initialized = {}, keys = [], flag) {
  return keys.reduce((prevInitialized, key) => {
    prevInitialized[key] = flag; // eslint-disable-line
    return prevInitialized;
  }, { ...initialized });
}

export function reducer(state = { initialized: {} }, { type, payload }) {
  switch (type) {
    case INITIALIZE_SUCCESS:
      return { ...state, initialized: toggleKeys(state.initialized, payload.keys, true) };
    case INITIALIZE_FAILED:
      return { ...state, initialized: toggleKeys(state.initialized, payload.keys, false) };
    case REMOVE_REQUEST: {
      const nextState = { ...state };
      delete nextState.req;
      return nextState;
    }
    default:
      return state;
  }
}
