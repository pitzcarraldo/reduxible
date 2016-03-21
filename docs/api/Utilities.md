# Utilities

Pure Flux and Redux were implemented by many actions and reducers with switch statements. Sometimes it can make huge modules and unmaintainable codes. So Reduxible provides some utility functions to make actions and reducers simple. But the application can be slow with the functions. Because `createReducer` builds a dictionary of reducers at the initializing time for the runtime performance. If you want the best performance all the time, then building actions and reducers with the standard Redux pattern can be a better choice.

## Caution

Actions and Reducers can have M: N relationship. So they should be decoupled for the scalability. For details, please read [reference of the Redux](http://redux.js.org/docs/basics/index.html) before using the functions.

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

## `createAction([namespace: string], actions: object)`

This function returns an reduxible action object. The reduxible action returns actionCreator and action type. You can define actions by simple way without namespace, or also can use namespace for more complicated states.

Without Namespace
```js
const action = createAction({
    "SET_TODO" : todo => ({ payload: { todo } })
});

action('SET_TODO'); // returns `todo => ({ payload: { todo } })`
action.type('SET_TODO'); // returns 'SET_TODO'. So you can also use a string literal 'SET_TODO' directly to call action type.

```

With Namespace
```js
const action = createAction('todo', {
    "SET_TODO" : todo => ({ payload: { todo } })
});

action('SET_TODO'); // returns `todo => ({ payload: { todo } })`
action.type('SET_TODO'); // returns 'todo/SET_TODO'

```


## `createReducer(initialState: object, reducers: array)`

This returns a redux reducer by actions.

## `combineRouteReducer(reducers: object)`

Combine reducers with [routeReducer](https://github.com/rackt/redux-simple-router#routereducer) of redux-simple-router. This can be used instead of combineReducers of redux.
