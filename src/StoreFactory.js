import { applyMiddleware, compose, createStore } from 'redux';

export default class StoreFactory {
  constructor(options) {
    this.middlewares = options.middlewares || [];
    this.reducers = options.reducers;
    this.reloader = options.reloader;
    this.devTools = options.devTools;
    this.useDevTools = options.useDevTools;
    this.validate();
  }

  validate() {
    if (!this.reducers) {
      throw new Error('A reducers is empty. Please check your config arguments.');
    }
  }

  createStore(initialState = {}, ...middlewares) {
    let finalCreateStore;
    const appliedMiddleware = applyMiddleware(...middlewares, ...this.middlewares);

    if (this.useDevTools && this.devTools) {
      finalCreateStore = compose(
        appliedMiddleware,
        ...this.devTools.composers()
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
