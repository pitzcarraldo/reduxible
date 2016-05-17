export default class RouterFactory {
  constructor(options = {}) {
    this.options = options;
    this.validate();
    this.Router = this.getRouter();
  }

  getRouter() {
    if (process.env.NODE_ENV !== 'production') {
      return require('./DevReduxibleRouter');
    }
    return require('./ReduxibleRouter');
  }

  validate() {
    if (
      this.options.config.isUniversal() &&
      typeof this.options.container !== 'function'
    ) {
      throw new Error(
        'A container should to be a react component. Please check your configurations.'
      );
    }
    if (
      this.options.config.isUniversal() &&
      this.options.errorContainer &&
      typeof this.options.errorContainer !== 'function'
    ) {
      throw new Error(
        'A errorContainer has to be a react component. Please check your configurations.'
      );
    }
    if (!this.options.routes) {
      throw new Error(
        'A routes is empty. Please check your configurations.'
      );
    }
  }

  createRouter(history, store) {
    return new this.Router({ ...this.options, history, store });
  }

  renderContainer() {
    const { container, extras } = this.options;
    return this.Router.renderComponent({ container, extras });
  }
}
