import React from 'react';
import { Router, RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
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
        return callback(null, null, this._provide(<RoutingContext {...renderProps} />));
      }

      return callback();
    });
  }

  render() {
    return this._provide(this._getRouter());
  }

  renderWithDevTools() {
    if(!this.devTools) {
      return this.render();
    }
    return this._provide(this._getRouterWithDevTools());
  }

  _provide(children) {
    return (
      <Provider store={this.store} key="provider">
        {children}
      </Provider>
    );
  }

  _getRouter() {
    return <Router history={this.history} routes={this.routes}/>;
  }

  _getRouterWithDevTools() {
    const DevTools = this.devTools;
    return (
      <div>
        {this._getRouter()}
        <DevTools/>
      </div>
    );
  }
}
