export function contextMiddleware(context) {
  return () => {
    return next => action => {
      action.context = context;
      return next(action);
    };
  };
}
