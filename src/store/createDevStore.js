import { applyMiddleware, compose, createStore } from 'redux';

export default function (initialState = {}, extraMiddlewares = []) {
  const middlewares = [
    ...this.middlewares,
    ...extraMiddlewares
  ];

  const appliedMiddleware = applyMiddleware(...middlewares);

  let enhancer;
  if (this.useDevTools) {
    if (!this.devTools.composers) {
      throw new Error('The devTools should have composers as function.');
    }
    enhancer = compose(appliedMiddleware, ...this.devTools.composers());
  } else {
    enhancer = appliedMiddleware;
  }

  const store = createStore(this.reducers, initialState, enhancer);

  if (this.reloader) {
    this.reloader(store);
  }

  return store;
}
