import React from 'react';
import ReactDOM from 'react-dom';
import warning from '../warning';
import ReduxibleRouter from './ReduxibleRouter';

export default class DevReduxibleRouter extends ReduxibleRouter {
  constructor(options) {
    super(options);
    this.devTools = options.devTools;
  }

  async renderClient(container, callback) {
    super.renderClient(container, callback);
    console.log(this);
    if (this.options.config.useDevTools()) {
      let router;
      try {
        window.React = React;
        const [, renderProps] = await this.route(this.routes, this.history, this.getLocation());
        router = this.provide(this.getRouter(renderProps));
      } catch (error) {
        warning(error);
        router = this.provide(this.getRouter({}, this.routes, this.history));
      }
      ReactDOM.render(router, container, callback);
    }
  }

  getRouter(renderProps, routes, history) {
    const DevTools = this.devTools;
    return (
      <div>
        {super.getRouter(renderProps, routes, history)} <DevTools />
      </div>
    );
  }
}
