import ReduxibleRouter from './ReduxibleRouter';

export default class RouterFactory {
  constructor(options) {
    this.options = options;
    this.validate();
  }

  validate() {
    if (typeof this.options.container !== 'function') {
      throw new Error('A container has to be a react element factory. Please check your config arguments.');
    }
    if (this.options.errorContainer && typeof this.options.errorContainer !== 'function') {
      throw new Error('A errorContainer has to be a react element factory. Please check your config arguments.');
    }
    if (!this.options.routes) {
      throw new Error('A routes is empty. Please check your config arguments.');
    }
  }

  createRouter(history, store) {
    return new ReduxibleRouter(this.options, history, store);
  }

  renderContainer() {
    const { container, extras } = this.options;
    return ReduxibleRouter.renderComponent({ container, extras });
  }
}
