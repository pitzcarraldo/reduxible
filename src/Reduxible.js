import ReduxibleConfig from './ReduxibleConfig';
import StoreFactory from './store/StoreFactory';
import RouterFactory from './router/RouterFactory';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import { routerMiddleware } from 'react-router-redux';
import warning from './warning';

export default class Reduxible {
  constructor(options = {}) {
    this.config = new ReduxibleConfig(options.config || options);
    this.storeFactory = new StoreFactory({ ...options, useDevTools: this.config.useDevTools() });
    this.routerFactory = new RouterFactory(options);
  }

  server() {
    if (!this.config.isServer()) {
      throw new Error(
        'A server() only can be called in server environment. Please check your config arguments.'
      );
    }
    return async(req, res, next) => {
      try {
        if (!this.config.isUniversal()) {
          return res.send(this.routerFactory.renderContainer());
        }

        const url = req.originalUrl || req.url || '/';
        const history = createMemoryHistory(url);
        const context = { config: this.config, req };
        const store = this.storeFactory.createStore({ context }, routerMiddleware(history));
        const router = this.routerFactory.createRouter(history, store);
        const { redirectLocation, rendered } = await router.renderServer(url, store);

        if (redirectLocation) {
          return res.redirect(redirectLocation.pathname);
        }

        return res.send(rendered);
      } catch (error) {
        warning(error.stack);

        if (error.component) {
          res.status(500);
          return res.send(error.component);
        }

        return next(error);
      }
    };
  }

  client(initialState = {}, container, callback) {
    if (!this.config.isClient()) {
      throw new Error(
        'A client() only can be called in browser. Please check your config arguments.'
      );
    }

    if (!container) {
      throw new Error('A container element is empty.');
    }

    let history;
    try {
      history = this.config.useHashHistory() ?
        require('react-router/lib/hashHistory') :
        require('react-router/lib/browserHistory');
    } catch (error) {
      warning('Failed to initialize browser history. Use memory history.');
      history = createMemoryHistory();
    }
    const context = { ...initialState.context, config: this.config };
    const store = this.storeFactory.createStore(
      { ...initialState, context }, routerMiddleware(history)
    );
    const router = this.routerFactory.createRouter(history, store);
    router.renderClient(container, callback);

    if (this.config.useDevTools()) {
      router.renderClientWithDevTools(container, callback);
    }
  }
}
