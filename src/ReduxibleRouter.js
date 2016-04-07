import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Router from 'react-router/lib/Router';
import RouterContext from 'react-router/lib/RouterContext';
import match from 'react-router/lib/match';
import Provider from 'react-redux/lib/components/Provider';
import { syncHistoryWithStore } from 'react-router-redux';
import { initialize } from './contextService';
import warning from './warning';


export default class ReduxibleRouter {
  constructor(options, history, store) {
    this.routes = options.routes;
    this.container = options.container;
    this.errorContainer = options.errorContainer;
    this.devTools = options.devTools;
    this.extras = options.extras;
    this.history = syncHistoryWithStore(history, store);
    this.store = store;
  }

  async renderServer(location) {
    try {
      const [redirectLocation, renderProps] = await this.route(this.routes, this.history, location);
      const { container, store, extras } = this;
      await this.preInitialize(store, renderProps.components);
      const component = this.provide(<RouterContext {...renderProps} />);
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

  async renderClient(container, callback) {
    let router;
    try {
      const [, renderProps] = await this.route(this.routes, this.history, this.getLocation());
      router = this.provide(this.getRouter(renderProps));
    } catch (error) {
      warning(error);
      router = this.provide(this.getRouter({}, this.routes, this.history));
    }
    ReactDOM.render(router, container, callback);
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

  route(routes, history, location) {
    return new Promise((resolve, reject) => {
      match({ routes, history, location }, (error, redirectLocation, renderProps) => {
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

        return resolve([null, renderProps]);
      });
    });
  }

  async preInitialize(store, components) {
    try {
      const initialActions = [...this.extractActions(components), initialize()];
      const willDispatch = initialActions.map(action =>
        Promise.resolve(store.dispatch(action)));
      return await Promise.all(willDispatch);
    } catch (error) {
      warning('Failed to PreInitialize. Render with initialStates.');
      warning(error.stack);
      return await Promise.reject(error);
    }
  }

  extractActions(components) {
    return components.reduce((prevActions, { initialActions }) => {
      if (initialActions) {
        prevActions.push(...initialActions); // eslint-disable-line
      }
      return prevActions;
    }, []);
  }

  provide(children) {
    return (
      <Provider store={this.store} key="provider">
        {children}
      </Provider>
    );
  }

  static renderComponent({ container, component = <div></div>, error, store = {}, extras = {} }) {
    const Html = container;
    return `<!doctype html>
      ${ReactDOMServer.renderToString(
      <Html component={component} error={error} store={store} { ...extras } />
    )}`;
  }

  getLocation() {
    const { pathname, search, hash } = window.location;
    return `${pathname}${search}${hash}`;
  }

  getRouter(renderProps, routes, history) {
    return <Router {...renderProps} routes={routes} history={history}/>;
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
