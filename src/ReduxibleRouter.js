import React from 'react';
import Router from 'react-router/lib/Router';
import RoutingContext from 'react-router/lib/RoutingContext';
import match from 'react-router/lib/match';
import Provider from 'react-redux/lib/components/Provider';
import { syncReduxAndRouter } from 'redux-simple-router';

export default class ReduxibleRouter {
  constructor(routes, store, history, devTools) {
    this.routes = routes;
    this.store = store;
    this.history = history;
    this.devTools = devTools;
    syncReduxAndRouter(this.history, this.store);
  }

  route(location, callback) {
    match({ routes: this.routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        return callback(error);
      }

      if (redirectLocation) {
        return callback(null, redirectLocation);
      }

      if (renderProps) {
        return callback(null, null, this.provide(<RoutingContext {...renderProps} />));
      }

      return callback();
    });
  }

  render() {
    return this.provide(this.getRouter());
  }

  renderWithDevTools() {
    return this.provide(this.getRouterWithDevTools());
  }

  provide(children) {
    return (
      <Provider store={this.store} key="provider">
        {children}
      </Provider>
    );
  }

  getRouter() {
    return <Router history={this.history} routes={this.routes}/>;
  }

  getRouterWithDevTools() {
    const DevTools = this.devTools;
    return (
      <div>
        {this.getRouter()}
        <DevTools/>
      </div>
    );
  }
}
