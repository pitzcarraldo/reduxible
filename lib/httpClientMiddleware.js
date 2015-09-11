export default function httpClientMiddleware(httpClient) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      return promise(httpClient)
        .then((response) => next({...rest, response: response.data, type: SUCCESS}))
        .catch((error) => next({...rest, error: error.data, type: FAILURE}));
    };
  };
}
