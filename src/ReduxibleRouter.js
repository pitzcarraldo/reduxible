import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Router from 'react-router/lib/Router';
import RoutingContext from 'react-router/lib/RoutingContext';
import match from 'react-router/lib/match';
import Provider from 'react-redux/lib/components/Provider';
import { syncReduxAndRouter } from 'redux-simple-router';

export default class ReduxibleRouter {
  constructor(options, history, store) {
    this.routes = options.routes;
    this.container = options.container;
    this.errorContainer = options.errorContainer;
    this.devTools = options.devTools;
    this.extras = options.extras;
    this.history = history;
    this.store = store;
    syncReduxAndRouter(history, store);
  }

  static renderComponent({ container, component = <div></div>, error, store = {}, extras = {} }) {
    const Html = container;
    return `<!doctype html>
      ${ReactDOMServer.renderToString(
        <Html component={component} error={error} store={store} { ...extras } />
      )}`;
  }

  provide(children) {
    return (
      <Provider store={this.store} key="provider">
        {children}
      </Provider>
    );
  }

  async renderServer(location) {
    try {
      const [redirectLocation, component] = await this.route(location);
      const { container, store, extras } = this;
      return {
        redirectLocation,
        rendered: ReduxibleRouter.renderComponent({ container, component, store, extras })
      };
    } catch (error) {
      const { errorContainer: container, extras } = this;
      if (container) {
        error.component = ReduxibleRouter.renderComponent({ container, error, extras });
      }
      throw error;
    }
  }

  route(location) {
    return new Promise((resolve, reject) => {
      match({ routes: this.routes, location }, (error, redirectLocation, renderProps) => {
        if (error) {
          return reject(error);
        }

        if (!redirectLocation && !renderProps) {
          return reject(
            new Error(
              'Failed to route. There is no matching path. Please check your routes configuration.'
            )
          );
        }

        if (redirectLocation) {
          return resolve([redirectLocation]);
        }

        if (renderProps) {
          return resolve([null, this.provide(<RoutingContext {...renderProps} />)]);
        }

        return null;
      });
    });
  }

  renderClient(container, callback) {
    ReactDOM.render(this.provide(this.getRouter()), container, callback);
  }

  renderClientWithDevTools(container, callback) {
    window.React = React;
    // render twice is necessary.
    // if not, React shows invalid server-client DOM sync error.
    ReactDOM.render(this.provide(this.getRouterWithDevTools()), container, callback);
  }

  getRouter() {
    return <Router history={this.history} routes={this.routes} />;
  }

  getRouterWithDevTools() {
    const DevTools = this.devTools;
    return (
      <div>
        {this.getRouter()} <DevTools />
      </div>
    );
  }
}
