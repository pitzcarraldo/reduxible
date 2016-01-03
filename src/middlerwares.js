export function serverMiddleware(server) {
  return ({ dispatch, getState }) => {
    return (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      action.payload = action.payload || {};
      action.payload.server = server;
      return next(action);
    };
  };
}
