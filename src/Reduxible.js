import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReduxibleRouter from './ReduxibleRouter';
import ReduxibleConfig from './Reduxibleconfig';
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
    const extras = this.extras;
    return (req, res, next) => {
      if(!this.config.isUniversal()) {
        return res.send(this._renderContainer({ component:'', store, ...extras }));
      }

      router.route(req.originalUrl, (error, redirectLocation, component)=> {
        if (error) {
          res.status(500);
          if (this.errorContainer) {
            return res.send(this._renderContainer({ component: this.errorContainer, store, ...extras }));
          }
          return res.send(this._renderContainer({ component: error, store, ...extras }));
        }

        if (redirectLocation) {
          return res.redirect(redirectLocation.pathname);
        }

        return res.send(this._renderContainer({ component, store, ...extras }));
      });

      next();
    };
  }

  _renderContainer(props) {
    const Html = this.container;
    return '<!doctype html>\n' + ReactDOMServer.renderToString(<Html {...props}/>);
  }

  client(initialState, dest) {
    const store = this.storeFactory.createStore(initialState);
    const history = createBrowserHistory();
    const router = new ReduxibleRouter(this.routes, store, history);
    ReactDOM.render(router.render(), dest);
    if (this.config.useDevTools()) {
      window.React = React;
      ReactDOM.render(router.renderDevTools(), dest);
    }
  }
}
