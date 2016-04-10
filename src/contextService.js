import React from 'react';

export function initialActions(...actions) {
  return function preInitialize(AsyncInitializedComponent) {
    function Initialize(props) {
      return <AsyncInitializedComponent {...props} />;
    }

    Initialize.initialActions = actions;
    return Initialize;
  };
}

export const INITIALIZE_ACTIONS = '@@context/INITIALIZE';

export function initialize(initialized = true) {
  return {
    type: INITIALIZE_ACTIONS,
    payload: initialized
  };
}

export function reducer(state = { initialized: false }, { type, payload }) {
  switch (type) {
    case INITIALIZE_ACTIONS:
      return { ...state, initialized: payload };
    default:
      return state;
  }
}
