# Instance API

If you have initialized the Reduxible instance with above proper options, then you can use these functions.

## `server()`

This returns Reduxible's express.js middleware for routing and rendering the react-redux application.

```js
const reduxible = new Reduxible(options);
const server = new Express();
server.use(reduxible.server());
```

## `client(initialState: object, container: element, callback: function)`

* `initialState`: A redux state object to initialize the client renderer. In common use cases, it is placed in window variable when the container is built. (ex: `window.__state__`)
* `container`: An element to be attached at the initialized Component.
* `callback`: A callback function to be invoked after mount.

```js
const reduxible = new Reduxible(options);
reduxible.client(window.__state__, document.getElementById('content'));
```
