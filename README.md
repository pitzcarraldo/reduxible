# [Reduxible](http://reduxible.js.org/)

## The Fast and Easy way to make React + Redux apps

[![Build Status](https://travis-ci.org/reduxible/reduxible.svg)](https://travis-ci.org/reduxible/reduxible)
[![Coverage Status](https://coveralls.io/repos/github/reduxible/reduxible/badge.svg?branch=master)](https://coveralls.io/github/reduxible/reduxible?branch=master)
[![npm version](https://img.shields.io/npm/v/reduxible.svg?style=flat-square)](https://www.npmjs.com/package/reduxible)
[![npm downloads](https://img.shields.io/npm/dm/reduxible.svg?style=flat-square)](https://www.npmjs.com/package/reduxible)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/reduxible/reduxible)

Universal (Isomorphic) Hot-Loadable and Pluggable(by middleware) Framework for [React](https://facebook.github.io/react/) and [Redux](http://rackt.github.io/redux) applications.
Reduxible can make it easy to get started to build React and Redux based Web Application and make it able to focus on business codes.
Reduxible is based on [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) and inspired by [Fluxible](https://github.com/yahoo/fluxible).

## Why Reduxible?

### Make Universal Application Easily with React + Redux

React, Redux and other related assets are already good enough to use directly. But some people (like me) just want to focus on application codes and don't want to spend time on building and maintaining the structure of the project. So I've wrapped and integrated mandatory libraries for React + Redux Application. If you use **Reduxible**, only what you need to do is code and set Router, Middleware, Reducers, and React Components to Reduxible. Then, you can run & see the React + Redux App immediately. Also, it can be a Universal App or Single Page App by config.

### We Need Long-Term Framework!

The environment of React and Redux has been changed very quickly almost every day. There are also a ton of related libraries and APIs changing frequently. But for building real products, we need stable and verified stuff. Reduxible provides useful modules having many references to make a universal application with React and Redux. And they are peer dependencies, so you can update them for the minor update. Reduxible will provide fixed APIs by wrapping the modules and will not be updated, except in a case of critical bugs. Therefore, you can only focus on building your own business features for your application without concerning or modifying integration codes of the application. Reduxible will provide Long-Term Services for React + Redux application that even can be run in the **Internet Explorer 8!** (I really really hate it, but for many reason, lots of people have to support it.)

## Getting Started


### Installation

```bash
$ npm install --save reduxible
```

### Add Dependencies

Reduxible has peer dependencies so that you need to add below dependencies to your project and its versions should be equal or higher. Currently, Reduxible supports [express](https://github.com/strongloop/express/) only for server-side.

```json
  "dependencies": {
      "history": "^1.17.0",
      "react": "^0.14.7",
      "react-dom": "^0.14.7",
      "react-redux": "^4.0.6",
      "react-router": "^1.0.3",
      "redux": "^3.0.6",
      "redux-simple-router": "^1.0.2"
    }
```

### Make The React + Redux Application

##### `app.js`

```js
import Reduxible from 'reduxible';
import reducers from './reducers';

const reduxible = new Reduxible({
      config: {
        server: true, //if run in the server, true
        development: true, //if development environment, true
        universal: true //if universal application, true
      },
      container: Html, //React Component Class to make <html></html> document.
      errorContainer: Error, //React Component Class will render when error occured.
      devTools: //Redux Dev Tools Component
      routes, //React Router Routes Configuration
      middlewares, //List of Redux Middlewares
      reducers, //Combined Redux Reducers
      reloader, //Reloader function to excuted when reducers are changed
      initialActions, //List of Redux Action to Reduced Before Render
      extras: extras //Extras to provide to container
});


//in the server
server.use(reduxible.server()); //Add to Connect or Express as middleware.

//in the client
reduxible.client(
	initialState, //InitialState to initialize the redux.
	container, //A container to mount a client element
	callback //A callback function to called after render
);

```

##### `todoService.js`

```js
import { createAction, createReducer } from 'reduxible';

export const action = createAction('todo', {
  ADD_TODO: (todo) => {
    return {
      payload: {
        todo
      },
      helper: true
    };
  }
});

export default createReducer({todos: []},[
  {
    types: [action.type('ADD_TODO')],
    reduce: (payload, state) => {
      const { todo } = payload;
      const todos = [...state.todos, todo];
      return {
        ...state,
        todos
      };
    }
  },
  ...
]);
```

##### `reducers.js`

```js
import { combineRouteReducers }  from 'reduxible';
import todo from './todoService';

export default combineRouteReducers({
  todo
})
```

##### `Todo.jsx`

```js
import { action } from './todoService';
...

@connect(state => { todos: state.todo.todos },{ updateTodo : action('UPDATE_TODO') })
class Todo extend Component {
...
}
```

## Examples

* [Universal Application Example.](https://github.com/Pitzcarraldo/reduxible-example).
* [Single Page Application Example.](https://github.com/Pitzcarraldo/reduxible-example/tree/spa)
* [Reduxible + Spring Boot Example.](https://github.com/Pitzcarraldo/reduxible-example/tree/spring)
* [Reduxible + Spring Boot Universal Example.](https://github.com/Pitzcarraldo/reduxible-example/tree/spring-universal)

### Browser Compatibility

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) |
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 8+ ✔

### License

This software is free to use under the Minkyu Cho. MIT license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/Pitzcarraldo/reduxible/blob/master/LICENSE

### Contributing

**Please don't hesitate to send a small pull-request or just leave anything you want as an issue.**

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
