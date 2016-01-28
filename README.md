# Reduxible: The LTS Universal Framework for React + Redux

[![Build Status](https://travis-ci.org/Pitzcarraldo/reduxible.svg)](https://travis-ci.org/Pitzcarraldo/reduxible)
[![npm version](https://img.shields.io/npm/v/reduxible.svg?style=flat-square)](https://www.npmjs.com/package/reduxible)
[![npm downloads](https://img.shields.io/npm/dm/reduxible.svg?style=flat-square)](https://www.npmjs.com/package/reduxible)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/Pitzcarraldo/reduxible)

Universal (Isomorphic) Hot-Loadable and Pluggable Framework for [React](https://facebook.github.io/react/) and [Redux](http://rackt.github.io/redux) applications.
Reduxible can make it easy to get started to build React and Redux based Web Application and make it able to focus on business codes.
Reduxible is based on [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) and inspired by [Fluxible](https://github.com/yahoo/fluxible).

## Why Reduxible?

### Make Universal Application Easily

React, Redux and other related assets are already good enough to use directly. But some people (like me) only want to focus on application codes and don't want to spend time for building and maintaining the project base. So I have wrapped base elements for React + Redux Application. If you use Reduxible, only what you need to do is code and set Router, Middleware, Reducers, and React Components to Reduxible. Then, you can run & see the React + Redux App immediately. Also, it can be a Universal App or Single Page App by config.

### We Need Long-Term Services!

The environment of React and Redux has been changed very quickly almost every day. There are also a ton of related libraries and APIs changing frequently. But for building real products, we need stable and verified stuffs. Reduxible provides useful modules having many references to make a universal application with React and Redux. And they are peer dependencies, so you can update them for the minor update. Reduxible will provide fixed APIs by wrapping the modules and will not be updated, except in case of critical bugs. Therefore, you can only focus on building your own business features for your application without concerning or modifying integration codes of the application. Reduxible will provide Long-Term Services for React + Redux application that even can be run in the **Internet Explorer 8!**

## Basic Concepts

### Write the code clearly

#### Managed Global Variables

Many universal application samples of React and Redux are using global variable like `__CLIENT__`, `__SERVER__`. But in many cases, global variables are not recommended. Because they makes it difficult to predict where they defined and hard to maintaining.
So Reduxible contains default configurations that needed in global when initialization.

#### Avoid the Huge Switch Statement & Call the same thing with other names

Commonly large switch statements are considered as the anti-pattern. But basic flux/redux patterns are using the switch statement to find actions by type. Also, actions are defined and called with camelCase and snake_case, and repeated many times. It makes application code too verbose.
Reduxible provides some [utility functions](#utility-functions) that makes these cases simpler.

For detail, see below links.

* [Refactoring large switch statement](http://codereview.stackexchange.com/questions/42125/refactoring-large-switch-statement)
* [Deprecating the switch statement for object literals](https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/)
* And you could find many results about it from google.


### Repeat simple work to make a service

There are many libraries to make a redux application short and simpler. But shortcodes without understanding and managing are not a good solution for every case. Developers have to write and make it simpler themselves to maintain it. Thus, when you build your app with Reduxible, we recommend that just write similar code repeatedly. Then, when if there will a lot of similar codes, they can make something like middlewares to make those simpler.

### Framework for right now

Considerable related things with React and Redux are not compatible with legacy environments like low versions of Internet Explorer. But many enterprise and services can't ignore them. Therefore, Reduxible is focusing to compatibility for support Internet Explorer 8 at least with some shims. And it also can be easily integrated with spring that one of the most popular platform. (please refer the [example project](https://github.com/Pitzcarraldo/reduxible-example).)

## Installation

### :construction: CAUTION: Do not use Experimental Releases

There are many pre-release versions before 0.0.2. They are experimental versions. I could not recommend using it.

```bash
$ npm install --save reduxible
```

## Dependencies

Reduxible has peer dependencies so that you need to add below dependencies to your project and its versions should be equal or higher. Currently, Reduxible supports [express](https://github.com/strongloop/express/) only for server-side.

```json
  "dependencies": {
      "history": "^1.17.0",
      "react": "^0.14.5",
      "react-dom": "^0.14.5",
      "react-redux": "^4.0.0",
      "react-router": "^1.0.3",
      "redux": "^3.0.4",
      "redux-simple-router": "^1.0.2"
    }
```

## API

### `Reduxible(options)`

A class to make a Reduxible instance. You can make a Reduxible instance for server, client, or both of them by configuration. It needs some option parameters below.

#### `Options`

##### `config(required)`

An object to set up the environment. All types are boolean, and the default value is false.

* `server`: A flag to determine a location for the instance, server or client. If this flag is true, Reduxible instance will work for server.
* `development`: A flag to determine an environment. If this flag is true, some development functions will be activated. (like Webpack Dev Server, DevTools, etc.)
* `universal`: A flag to determine whether it is an Universal Application or not. If this flag is true, some universal functions will be enabled. If you want to make this Application to Single Page Application, set this to false.
* `hashHistory`: Use hashHistory when this is true. It will work only universal is false. (Only for Single Page Application.)
* `devTools`: A flag to determine whether to use Redux Dev Tools or not. Thin flag only works in development environment.

##### `container: component`

A React Component that makes a html layout. This returns elements like `<html>...</html>`

##### `errorContainer: component`

A React Component that renders a response when it does not succeed. If this is empty, Application will return a raw error stack with string.

##### `devTools: component`

A [Redux DevTools](https://github.com/gaearon/redux-devtools) Component. It returns a result of createDevTools of Redux DevTools like [this](https://github.com/gaearon/redux-devtools/blob/master/examples/todomvc/containers/DevTools.js). And devTools must have a function called `composers` that returns DevTools.instrument() and debug-session. See [this example](https://github.com/Pitzcarraldo/reduxible-example/blob/master/src/universal/helpers/DevTools.js).

##### `routes: object`

A plain route of react-router.([see this](https://github.com/rackt/react-router/blob/1.0.x/docs/API.md#plainroute)).

##### `middlewares: array`

An array that contains redux middlewares.

* `contextMiddleware`: The contextMiddleware will be injected before other middlewares. It will add a `context` field to every actions. The `context` field has below information. You can add more properties to context in your own middleware.
    * server or client: A flag presenting the current environment.
    * req/res/next (only server): Express middleware objects.

##### `reducers: object`

An object that contains redux reducers to be used after combining.

##### `reloader: function`

A function that executed when hot modules are reloaded. A Reducer replacement codes have to be placed in this.

#### `initialActions: array (experimental)`

The List of Actions that has to be executed before rendering. They will be reduced shortly after being created on the server. So states also will be updated before connecting with React Components. You can place async actions invoked here before the first rendering. When if they were failed, sever will render with initial state with error logs. For detail, see [this example project](https://github.com/Pitzcarraldo/reduxible-example/blob/master/src/universal/services/initialActions.js).

##### `extras: object`

Extra options that you want to use in the Reduxible Application. These will be injected to the container.

#### `Functions`

If you have initialized the Reduxible instance with above proper options, then you can use below functions.

##### `server()`

This returns Reduxible's express.js middleware for routing and rendering the react-redux application.

```js
const reduxible = new Reduxible(options);
const server = new Express();
server.use(reduxible.server());
```

##### `client(initialState: object, dest: element)`

* `initialState`: A redux state object to initialize the client renderer. In common use cases, it is placed in window variable when the container is built. (ex: `window.__state__`)
* `dest`: An element to be attached at the initialized Component.

```js
const reduxible = new Reduxible(options);
reduxible.client(window.__state__, document.getElementById('content'));
```

### Utility Functions

Pure Flux and Redux were implemented by many actions and reducers with switch statements. Sometimes it can make huge modules and unmaintainable codes. So Reduxible provides some utility functions to make actions and reducers simple. But the application can be slow with the functions. Because `createReducer` builds a dictionary of reducers at the initializing time for the runtime performance. If you want the best performance all the time, then building actions and reducers with the standard Redux pattern can be a better choice.

#### :warning: WARNING

Actions and Reducers can have M:N relationship. So they should be decoupled for the scalability. For details, please read [reference of the Redux](http://redux.js.org/docs/basics/index.html) before using the functions.

Reduxible provides some utility functions to make redux actions and reducer simpler.
You can define actions and reducers referring to below.

```js
const actions = {
  ADD_TODO: (todo) => {
    return {
      payload: {
        todo
      },
      helper: true
    };
  },
  REMOVE_TODO: (index) => {
    return {
      payload: {
        index
      },
      helper: true
    };
  }
};

const reducers = [
  {
    types: ['ADD_TODO'],
    reduce: (payload, state) => {
      const { todo } = payload;
      const todos = [...state.todos, todo];
      return {
        ...state,
        todos
      };
    }
  },
  {
    types: ['REMOVE_TODO'],
    reduce: (payload, state) => {
      const { index } = payload;
      const todos = [...state.todos];
      if (index > -1) {
        todos.splice(index, 1);
      }
      return {
        ...state,
        todos
      };
    }
  }
];
```

You don't need to duplicate the type declaration in action creator. These Utility functions will cover repetitive tasks and call action names.

#### `createAction(actions: object)`

This returns an action by its action type.

#### `createReducer(initialState: object, reducers: array)`

This returns a redux reducer by actions.

#### `combineRouteReducer(reducers: object)`

Combine reducers with [routeReducer](https://github.com/rackt/redux-simple-router#routereducer) of redux-simple-router. This can be used instead of combineReducers of redux.

### Example of Reduxible Actions

##### `todo.js`

```js
import { createAction, createReducer } from 'reduxible';

export const action = createAction({
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
    types: ['ADD_TODO'],
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
import todo from './todo';

export default combineRouteReducers({
  todo
})
```

##### `your-application.js`

```js
import reducers from './reducers'

const reduxible = new Reduxible({
  ...
  reducers
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

**Please don't hesitate to send a small pull-request or just leave anything you want as an issue.**

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
