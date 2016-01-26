import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReduxibleRouter from './ReduxibleRouter';
import ReduxibleConfig from './ReduxibleConfig';
import StoreFactory from './StoreFactory';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import { contextMiddleware } from './middlerwares';

export default class Reduxible {
  constructor(options = {}) {
    this.config = new ReduxibleConfig(options.config);
    this.container = options.container;
    this.errorContainer = options.errorContainer;
    this.devTools = options.devTools;
    this.routes = options.routes;
    this.storeFactory = new StoreFactory({ ...options, useDevTools: this.config.useDevTools() });
    this.initialActions = options.initialActions || [];
    this.extras = options.extras || {};
  }

  server() {
    return (req, res, next) => {
      (async ()=> {
        try {
          if (!this.config.isUniversal()) {
            return res.send(this.render(''));
          }

          const context = {
            server: true,
            ...{ req, res, next }
          };

          const store = this.storeFactory.createStore({}, [ contextMiddleware(context) ]);
          await this.preInitialize(store);

          const history = createMemoryHistory();
          const router = new ReduxibleRouter(this.routes, store, history, this.devTools);

          return router.route(req.originalUrl, this.serverRoute(res, store));
        } catch (error) {
          /* eslint-disable no-console */
          console.error('Server Side Rendering was Failed. Render Empty View.', error.stack);
          return res.send(this.render(''));
        }
      })();
    };
  }

  async preInitialize(store) {
    try {
      const willDispatch = this.initialActions.map(action => store.dispatch(action));
      await Promise.all(willDispatch);
    } catch (error) {
      /* eslint-disable no-console */
      console.error('Pre-initialization was Failed. Render With InitialStates', error.stack);
    }
  }

  render(component, store) {
    try {
      const Html = this.container;
      const extras = this.extras;
      return '<!doctype html>\n' +
        ReactDOMServer.renderToString(
          <Html component={component} store={store} { ...extras } />
        );
    } catch (error) {
      return this.renderError(error);
    }
  }

  renderError(error) {
    if (!this.errorContainer) {
      return error.stack;
    }

    const Error = this.errorContainer;
    const extras = this.extras;
    return '<!doctype html>\n' +
      ReactDOMServer.renderToString(
        <Error error={error} { ...extras } />
      );
  }

  serverRoute(res, store) {
    return (error, redirectLocation, component) => {
      if (redirectLocation) {
        return res.redirect(redirectLocation.pathname);
      }
      if (error) {
        res.status(500);
        return res.send(this.renderError(error));
      }
      return res.send(this.render(component, store));
    };
  }

  client(initialState, dest) {
    const context = {
      client: true
    };
    const store = this.storeFactory.createStore(initialState, [ contextMiddleware(context) ]);
    const history = this.config.useHashHistory() ? createHashHistory() : createBrowserHistory();
    const router = new ReduxibleRouter(this.routes, store, history, this.devTools);

    ReactDOM.render(router.render(), dest);

    if (this.config.useDevTools() && this.devTools) {
      window.React = React;

      // render twice is necessary.
      // if not, React shows invalid server-client DOM sync error.
      ReactDOM.render(router.renderWithDevTools(), dest);
    }
  }
}
