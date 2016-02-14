# Example of Reduxible Actions

## `app.js`

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
```

## `todoService.js`

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

## `reducers.js`

```js
import { combineRouteReducers }  from 'reduxible';
import todo from './todoService';

export default combineRouteReducers({
  todo
})
```

## `Todo.js`

```js
import { action } from './todoService';
...

@connect(state => { todos: state.todo.todos },{ updateTodo : action('UPDATE_TODO') })
class Todo extend Component {
...
}
```
