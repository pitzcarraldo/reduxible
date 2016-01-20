import { createStore, applyMiddleware, compose } from 'redux';

export default class StoreFactory {
  constructor(options) {
    this.devTools = options.devTools;
    this.middlewares = options.middlewares;
    this.reducers = options.reducers;
    this.reloader = options.reloader;
  }

  createStore(initialState = {}, middlewares = []) {
    let finalCreateStore;
    let appliedMiddleware = applyMiddleware(...middlewares, ...this.middlewares);

    if (this.devTools && this.devTools.composers) {
      finalCreateStore = compose(
        appliedMiddleware,
        ...this.devTools.composers
      )(createStore);
    } else {
      finalCreateStore = appliedMiddleware(createStore);
    }

    const store = finalCreateStore(this.reducers, initialState);

    if (this.reloader) {
      this.reloader(store);
    }

    return store;
  }
}
