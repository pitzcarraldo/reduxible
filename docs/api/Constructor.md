# Reduxible Constructor

A class to make a Reduxible instance. You can make a Reduxible instance for the server, client, or both of them by configuration. It needs some option parameters below.

## `Options`

### `config(required)`

An object to set up the environment. All types are boolean, and the default value is false.

* `server`: A flag to determine a location for the instance, server or client. If this flag is true, the Reduxible instance will work for the server.
* `development`: A flag to determine an environment. If this flag is true, some development functions will be activated. (like Webpack Dev Server, DevTools, etc.)
* `universal`: A flag to determine whether it is a Universal Application or not. If this flag is true, some universal functions will be enabled. If you want to make this Application to Single Page Application, set this to false.
* `hashHistory`: Use hashHistory when this is true. It will work only universal is false. (Only for Single Page Application.)

### `container: react component`

A React Component that makes a HTML layout. This returns elements like `<html>...</html>`. Below items will provide by props.

* `component`: React element to render into the container.
* `error`: Occurred Error. This means you can use this container to errorContainer too.
* `store`: Initialized Redux Store.
* `extras`: Extra values to use in the container. Extras will be spread. ({...extras})

### `errorContainer: react component`

A React Component that renders a response when it does not succeed. If this is empty, Application will return a raw error stack with string.

* `error`: React element to render into the container.
* `extras`: Same with extras of container.

### `devTools: redux dev tools component`

A [Redux DevTools](https://github.com/gaearon/redux-devtools) Component. It returns a result of createDevTools of Redux DevTools like [this](https://github.com/gaearon/redux-devtools/blob/master/examples/todomvc/containers/DevTools.js). And devTools must have a function called `composers` that returns DevTools.instrument() and debug-session. See [this example](https://github.com/Pitzcarraldo/reduxible-example/blob/master/src/universal/helpers/DevTools.js).

### `routes: object`

A plain route of react-router.([see this](https://github.com/rackt/react-router/blob/1.0.x/docs/API.md#plainroute)).

### `middlewares: array`

An array that contains redux middlewares.

* `contextMiddleware`: The contextMiddleware will be injected before other middlewares. It will add a `context` field to every action. The `context` field has below information. You can add more properties to the context in your own middleware.
    * server or client: A flag presenting the current environment.
    * req/res/next (only server): Express middleware objects.

### `reducers: object`

An object that contains redux reducers to be used after combining.

### `reloader: function`

A function that executed when hot modules are reloaded. A Reducer replacement codes have to be placed in this.

### `initialActions: array (experimental)`

The List of Actions that has to be executed before rendering. They will be reduced shortly after being created on the server. So states also will be updated before connecting with React Components. You can place async actions invoked here before the first rendering. When if they were failed, the server will render the initial state with error logs. For detail, see [this example project](https://github.com/Pitzcarraldo/reduxible-example/blob/master/src/universal/services/initialActions.js).

### `extras: object`

Extra options that you want to use in the Reduxible Application. These will be injected into the container.
