import { applyMiddleware, compose, createStore } from 'redux';
import { syncHistory } from 'react-router-redux';

export default class StoreFactory {
  constructor({ middlewares = [], reducers, reloader, devTools, useDevTools }) {
    this.middlewares = middlewares;
    this.reducers = reducers;
    this.reloader = reloader;
    this.devTools = devTools;
    this.useDevTools = useDevTools;
    this.validate();
  }

  validate() {
    if (!this.reducers) {
      throw new Error('A reducers is empty. Please check your config arguments.');
    }
  }

  createStore(initialState = {}, middlewares = [], history) {
    const reduxRouterMiddleware = syncHistory(history);
    const appliedMiddleware = applyMiddleware(
      ...middlewares,
      ...this.middlewares,
      reduxRouterMiddleware
    );

    let finalMiddlewares;
    if (this.useDevTools && this.devTools) {
      finalMiddlewares = compose(
        appliedMiddleware,
        ...this.devTools.composers()
      );
    } else {
      finalMiddlewares = appliedMiddleware;
    }

    const store = createStore(this.reducers, initialState, finalMiddlewares);

    reduxRouterMiddleware.listenForReplays(store);

    if (this.reloader) {
      this.reloader(store);
    }

    return store;
  }
}
