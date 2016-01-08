import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import DevTools from './DevTools';

export default class StoreFactory {
  constructor(options) {
    this.useDevTools = options.config.useDevTools();
    this.middleware = options.middleware;
    this.reducer = options.reducer;
    this.reloader = options.reloader;
  }

  createStore(initialState = {}, middleware = []) {
    let finalCreateStore;
    let appliedMiddleware = applyMiddleware(...middleware, ...this.middleware);

    if (this.useDevTools) {
      finalCreateStore = compose(
        appliedMiddleware,
        DevTools.instrument(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
      )(createStore);
    } else {
      finalCreateStore = appliedMiddleware(createStore);
    }

    const store = finalCreateStore(this.reducer, initialState);

    if (this.reloader) {
      this.reloader(store);
    }

    return store;
  }
}
