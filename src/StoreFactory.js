import createStore from 'redux/lib/createStore';
import applyMiddleware from 'redux/lib/utils/applyMiddleware';
import compose from 'redux/lib/utils/compose';

export default class StoreFactory {
  constructor(options) {
    this.middlewares = options.middlewares;
    this.reducers = options.reducers;
    this.reloader = options.reloader;
    this.devTools = options.devTools;
    this.useDevTools = options.useDevTools;
  }

  createStore(initialState = {}, middlewares = []) {
    let finalCreateStore;
    let appliedMiddleware = applyMiddleware(...middlewares, ...this.middlewares);

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
