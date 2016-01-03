# Reduxible

[![Build Status](https://travis-ci.org/Pitzcarraldo/reduxible.svg)](https://travis-ci.org/Pitzcarraldo/reduxible)
[![npm version](https://img.shields.io/npm/v/reduxible.svg?style=flat-square)](https://www.npmjs.com/package/reduxible)
[![npm downloads](https://img.shields.io/npm/dm/reduxible.svg?style=flat-square)](https://www.npmjs.com/package/reduxible)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/Pitzcarraldo/reduxible)

Universal (Isomorphic) Hot-Loadable and Pluggable Framework for [React](https://facebook.github.io/react/) and [Redux](http://rackt.github.io/redux) applications.
Reduxible can make it easy to get started to build React and Redux based Web Application and make it able to focus to business code.
Reduxible is based on [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) and inspired by [Fluxible](https://github.com/yahoo/fluxible).

## :construction: CAUTION
Reduxible is now under construction. So it is not ready to use for production. Many APIs are changing everday and there are a lot of pre-release version like '0.0.x-alpha.x'. I don't recommend to use it. But if you want to make this better with me, do anything that you want with Reduxible. I'm always waiting for pull requests and opinions by issue.

## Why Reduxible?

React, Redux and other related things are already good enough to use directly. But some people (like me) only want to focus to application codes and don't want to spend time for make and sustain project base. So I wrapped base elements for React + Redux Application. If you use Reduxible, you only have to make and set Router, Middleware, Reducers and React Components to Reduxible. When then, you can run React + Redux App immediately. Also, it can be Universal App or Single Page App by config.

## Installation

```bash
$ npm install --save reduxible
```

## Dependencies

Reduxible has peer dependencies like below. So you can use Reduxible with these modules with these versions or after. And Reduxible only support [express](https://github.com/strongloop/express/) for server-side for now.

```json
  "peerDependencies": {
      "history": "^1.17.0",
      "react": "^0.14.5",
      "react-dom": "^0.14.5",
      "react-redux": "^4.0.0",
      "react-router": "^1.0.3",
      "redux": "^3.0.4",
      "redux-devtools": "^3.0.0-beta-3",
      "redux-devtools-dock-monitor": "^1.0.0-beta-3",
      "redux-devtools-log-monitor": "^1.0.0-beta-3",
      "redux-simple-router": "^1.0.2"
    }
```

## API

### `Reduxible(options)`

A class for make the Reduxible instance. You can make Reduxible instance for server and client both by config. It needs some options parameters like below.

#### `Options`

##### `config(required)`
An object to set up environment. All of types are boolean, and default value is false.

  * `server`: A flag to determine location where to used instance, server or client. If this flag is true, Reduxible instance will work for server.
  * `development`: A flag to determine environment. If this flag is true, some development functions will activated. (like Webpack Dev Server, DevTools...ETC)
  * `universal`: A flag to determine whether the Universal Application. If this flag is true, some universal functions will work. If you want to make Application to Single Page Application, set this to false.
  * `devTools`: A flag to determine whether to use Redux Dev Tools. Thin flag only works in development environment.

##### `container: component`
A React Component what make html layout. This have to return element like `<html>...</html>`

##### `errorContainer: component`
A React Component what will render when response is not succeed. If this is empty, Application will return raw error response with string.

##### `routes: object`
A plain route of react-router.([see this](https://github.com/rackt/react-router/blob/1.0.x/docs/API.md#plainroute)).

##### `middleware: array`
An array what contains redux middleware to use.

##### `reducer: object`
An object what contains redux reducer to use.

##### `reloader: function`
A function what executed when hot module reloaded. A Reducer replacement codes has to placed in this.

##### `extras: object`
A extra options what you want to use in Reduxible Application. This will inject to container by spread.

#### `Functions`

If you make the Reduxible instance with above options, you can use below functions.

##### `server()`

This returns express middleware for route and render react-redux application.

```js
const reduxible = new Reduxible(options);
const server = new Express();
server.use(reduxible.server());
```

##### `client(initialState: object, dest: element)`
  * `initialState`: A redux state object to initialize client renderer. In common, it stored to object contained by window when build container. (ex: `window.__state__`)
  * `dest`: An element to attached initialized Component.

```js
const reduxible = new Reduxible(options);
reduxible.client(window.__state__, document.getElementById('content'));
```

### Utility Functions

#### :warning: WARNING
These functions only support one to one relation for action creator and reducer. But they can be related with many to many in basic Flux and Redux concepts. So if you want to make many to many relations for them, implement with pure redux functions. But these functions also gonna changes for support many to many. (For detail, see [this issue](https://github.com/Pitzcarraldo/reduxible/issues).)

Reduxible provides some utility functions to make redux actions and reducer simpler.
You can define actions like below.

```js
const actions = {
  ADD_TODO: {
    creator: (todo) => {
      return {
        payload : {
          todo
        }
      };
    },
    reducer: (payload, state) => {
      const { todo } = payload;
      const todos = [ ...state.todos, todo ];
      return {
        todos
      };
    }
  }
};

```

You don't need to duplicate the type declaration in action creator, and don't need to spread previous state in reducer. These Utility function will cover repetitive tasks.

#### `createAction(actions: object)`
This returns function that return action by action type.

#### `createReducer(initialState: object, actions: object)`
This makes redux reducer by actions.

#### `combineRouteReducer(reducers)`
Combine reducers with [routeReducer](https://github.com/rackt/redux-simple-router#routereducer) of redux-simple-router. This can be used instead of combineReducers of redux.

### Example of Reduxible Actions

##### `todo.js`
```js
import { createAction, createReducer } from 'reduxible';

const actions = {
  ADD_TODO : {
    ...
  }
}

export default createReducer({todos: []},actions);
export const action = createAction(actions);
```

##### `reducer.js`
```js
import { combineRouteReducers }  from 'reduxible';
import todo from './todo';

export default combineRouteReducers({
  todo
})
```

##### `your-application.js`
```js
import reducer from './reducer'

const reduxible = new Reduxible({
  ...
  reducer
  ...
})
```

##### `Todo.jsx`
```js
import { action } from './todo';
...

@connect(state => { todos: state.todo.todos },{ updateTodo : action('UPDATE_TODO') })
class Todo extend Component {
...
}
```

## Example

  * You can see the example to know how to use Reduxible in [here](https://github.com/Pitzcarraldo/reduxible-example).

### Browser Compatibility

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) |
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 8+ ✔ |

### License

This software is free to use under the Minkyu Cho. MIT license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/Pitzcarraldo/reduxible/blob/master/LICENSE

### Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
