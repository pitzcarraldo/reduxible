import { applyMiddleware, createStore } from 'redux';

export default function (initialState = {}, extraMiddlewares = []) {
  const middlewares = [
    ...this.middlewares,
    ...extraMiddlewares
  ];

  const enhancer = applyMiddleware(...middlewares);
  return createStore(this.reducers, initialState, enhancer);
}
