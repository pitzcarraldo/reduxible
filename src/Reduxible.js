import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReduxibleRouter from './ReduxibleRouter';
import ReduxibleConfig from './ReduxibleConfig';
import StoreFactory from './StoreFactory';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

export default class Reduxible {
  constructor(options = {}) {
    this.config = new ReduxibleConfig(options.config);
    this.container = options.container;
    this.errorContainer = options.errorContainer;
    this.routes = options.routes;
    this.storeFactory = new StoreFactory({ ...options, config: this.config });
    this.extras = options.extras;
  }

  server() {
    const store = this.storeFactory.createStore();
    const history = createMemoryHistory();
    const router = new ReduxibleRouter(this.routes, store, history);
    const render = (component) => {
      const Html = this.container;
      const extras = this.extras;

      return '<!doctype html>\n' + ReactDOMServer.renderToString(
        <Html component={component} store={store} {...extras} />);
    };

    return (req, res, next) => {
      if (!this.config.isUniversal()) {
        return res.send(render(''));
      }

      router.route(req.originalUrl, (error, redirectLocation, component)=> {
        if (redirectLocation) {
          return res.redirect(redirectLocation.pathname);
        }

        let renderTarget = component;

        if (error) {
          res.status(500);

          if (this.errorContainer) {
            renderTarget = this.errorContainer;
          } else {
            renderTarget = error;
          }
        }

        return res.send(render(renderTarget));
      });

      next();
    };
  }

  client(initialState, dest) {
    const store = this.storeFactory.createStore(initialState);
    const history = createBrowserHistory();
    const router = new ReduxibleRouter(this.routes, store, history);

    ReactDOM.render(router.render(), dest);

    if (this.config.useDevTools()) {
      window.React = React;

      // render twice is necessary.
      // if not, React shows invalid server-client DOM sync error.
      ReactDOM.render(router.renderWithDevTools(), dest);
    }
  }
}