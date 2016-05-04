import ReduxibleRouter from './ReduxibleRouterImpl';

export default class RouterFactory {
  constructor(options = {}) {
    this.options = options;
    this.validate();
  }

  validate() {
    if (typeof this.options.container !== 'function') {
      throw new Error(
        'A container should to be a react component. Please check your configurations.'
      );
    }
    if (this.options.errorContainer && typeof this.options.errorContainer !== 'function') {
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
    return new ReduxibleRouter({ ...this.options, history, store });
  }

  renderContainer() {
    const { container, extras } = this.options;
    return ReduxibleRouter.renderComponent({ container, extras });
  }
}
