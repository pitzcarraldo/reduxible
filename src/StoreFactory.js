import { applyMiddleware, createStore } from 'redux';

export default class StoreFactory {
  constructor(options) {
    this.middlewares = options.middlewares || [];
    this.reducers = options.reducers;
    this.validate();
  }

  validate() {
    if (!this.reducers) {
      throw new Error('A reducers is empty. Please check your config arguments.');
    }
  }

  createStore(initialState = {}, extraMiddlewares = []) {
    const middlewares = [
      ...this.middlewares,
      ...extraMiddlewares
    ];

    const enhancer = applyMiddleware(...middlewares);
    return createStore(this.reducers, initialState, enhancer);
  }
}
