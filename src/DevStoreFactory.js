import { applyMiddleware, compose, createStore } from 'redux';
import StoreFactory from './StoreFactory.js';

export default class DevStoreFactory extends StoreFactory {
  constructor(options) {
    super(options);

    this.reloader = options.reloader;
    this.devTools = options.devTools;
    this.useDevTools = options.useDevTools;
  }

  createStore(initialState = {}, extraMiddlewares = []) {
    const middlewares = [
      ...this.middlewares,
      ...extraMiddlewares
    ];

    const appliedMiddleware = applyMiddleware(...middlewares);

    let enhancer;
    if (this.useDevTools && this.devTools) {
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
}
