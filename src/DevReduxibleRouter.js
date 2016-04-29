import React from 'react';
import ReactDOM from 'react-dom';
import warning from './warning';
import ReduxibleRouter from './ReduxibleRouter';


export default class DevReduxibleRouter extends ReduxibleRouter {
  constructor(options) {
    super(options);

    this.devTools = options.devTools;
  }

  async renderClientWithDevTools(container, callback) {
    let router;
    try {
      window.React = React;
      const [, renderProps] = await this.route(this.routes, this.history, this.getLocation());
      router = this.provide(this.getRouterWithDevTools(renderProps));
    } catch (error) {
      warning(error);
      router = this.provide(this.getRouterWithDevTools({}, this.routes, this.history));
    }
    ReactDOM.render(router, container, callback);
  }

  getRouterWithDevTools(renderProps, routes, history) {
    const DevTools = this.devTools;
    return (
      <div>
        {this.getRouter(renderProps, routes, history)} <DevTools />
      </div>
    );
  }
}
