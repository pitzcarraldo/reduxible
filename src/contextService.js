import React from 'react';

export default function initialActions(...actions) {
  return function initialize(AsyncInitializedComponent) {
    function Initialize(props) {
      return <AsyncInitializedComponent {...props} />;
    }

    Initialize.initialActions = actions;
    return Initialize;
  };
}
export const INITIALIZE = '@context/INITIALIZE';
export function initialize() {
  return {
    type: INITIALIZE
  }
}
export function reducer(state = { initialized: false }, { type }) {
  switch (type) {
    case INITIALIZE:
      return { ...state, initialized: true };
    default:
      return state;
  }
}
