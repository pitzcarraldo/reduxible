import ReduxibleConfig from './ReduxibleConfig';
import StoreFactory from './StoreFactory';
import RouterFactory from './RouterFactory';
import browserHistory from 'react-router/lib/browserHistory';
import hashHistory  from 'react-router/lib/hashHistory';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import contextMiddleware from './contextMiddlerware';
import warning from './warning';

export default class Reduxible {
  constructor(options = {}) {
    this.config = new ReduxibleConfig(options.config || options);
    this.routerFactory = new RouterFactory(options);
    this.storeFactory = new StoreFactory({ ...options, useDevTools: this.config.useDevTools() });
    this.initialActions = options.initialActions || [];
  }

  server() {
    if (!this.config.isServer()) {
      throw new Error('A server() only can be called in server environment. Please check your config arguments.');
    }
    return async(req, res, next) => {
      try {
        if (!this.config.isUniversal()) {
          return res.send(this.routerFactory.renderContainer());
        }

        const history = createMemoryHistory();
        const store = this.storeFactory.createStore(
          {},
          [ contextMiddleware({ config: this.config, history, req, res, next }) ],
          history
        );

        await this.preInitialize(store);

        const router = this.routerFactory.createRouter(history, store);
        const url = req.originalUrl || req.url || '/';
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

  async preInitialize(store) {
    try {
      const willDispatch = this.initialActions.map(action => Promise.resolve(store.dispatch(action)));
      return await Promise.all(willDispatch);
    } catch (error) {
      warning('Failed to PreInitialize. Render with initialStates.');
      warning(error.stack);
    }
  }

  client(initialState = {}, container, callback) {
    if (!this.config.isClient()) {
      throw new Error('A client() only can be called in browser. Please check your config arguments.');
    }

    if (!container) {
      throw new Error('A container element is empty.');
    }

    let history;
    try {
      history = this.config.useHashHistory() ? hashHistory : browserHistory;
    } catch (error) {
      warning('Failed to initialize browser history. Use memory history.');
      history = createMemoryHistory();
    }
    const store = this.storeFactory.createStore(
      initialState,
      [ contextMiddleware({ config: this.config, history }) ],
      history
    );
    const router = this.routerFactory.createRouter(history, store);

    router.renderClient(container, callback);

    if (this.config.useDevTools()) {
      router.renderClientWithDevTools(container, callback);
    }
  }
}
