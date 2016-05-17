export default class StoreFactory {
  constructor(options) {
    this.options = options;
    this.middlewares = options.middlewares || [];
    this.reducers = options.reducers;
    this.reloader = options.reloader;
    this.devTools = options.devTools;
    this.useDevTools = options.useDevTools;
    this.validate();
    this.createStore = this.getCreateStore();
  }

  validate() {
    if (!this.reducers) {
      throw new Error('A reducers is empty. Please check your config arguments.');
    }
  }

  getCreateStore() {
    if (process.env.NODE_ENV !== 'production') {
      return require('./createDevStore');
    }
    return require('./createStore');
  }
}
