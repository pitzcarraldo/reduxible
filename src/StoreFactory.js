import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import DevTools from './DevTools';

export default class StoreFactory {
  constructor(options) {
    this.useDevTools = options.config.useDevTools();
    this.middlewares = options.middlewares;
    this.reducers = options.reducers;
    this.reloader = options.reloader;
  }

  createStore(initialState = {}, middlewares = []) {
    let finalCreateStore;
    let appliedMiddleware = applyMiddleware(...middlewares, ...this.middlewares);

    if (this.useDevTools) {
      finalCreateStore = compose(
        appliedMiddleware,
        DevTools.instrument(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
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
