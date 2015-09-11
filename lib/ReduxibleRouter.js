import React from 'react';
import Router from 'react-router';
import { Provider } from 'react-redux';

export default class ReduxibleRouter {
  constructor(routes) {
    this.routes = routes;
  }

  route(location, history, store) {
    return new Promise((resolve, reject) => {
      Router.run(this.routes, location, [ReduxibleRouter.createTransitionHook(store)], (error, initialState, transition) => {
        if (error) {
          return reject(error);
        }

        if (transition && transition.redirectInfo) {
          return resolve({
            transition,
            isRedirect: true
          });
        }

        if (history) {  // only on client side
          initialState.history = history;
        }

        const component = (
          <Provider store={store} key="provider">
            {() => <Router {...initialState} children={this.routes}/>}
          </Provider>
        );

        return resolve({
          component,
          isRedirect: false
        });
      });
    });
  }

  static createTransitionHook(store) {
    return (nextState, transition, callback) => {
      const { params, location: { query } } = nextState;
      const promises = nextState.branch
        .map(route => route.component)                          // pull out individual route components
        .filter((component) => ReduxibleRouter.getFetchData(component))         // only look at ones with a static fetchData()
        .map(ReduxibleRouter.getFetchData)                                      // pull out fetch data methods
        .map(fetchData => fetchData(store, params, query || {}));  // call fetch data methods and save promises
      Promise.all(promises)
        .then(() => {
          callback(); // can't just pass callback to then() because callback assumes first param is error
        }, (error) => {
          callback(error);
        });
    };
  }

  static getFetchData(component = {}) {
    if(component.WrappedComponent) {
      return ReduxibleRouter.getFetchData(component.WrappedComponent);
    }
    return component.fetchData;
  }
}