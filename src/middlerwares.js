export function serverMiddleware(server) {
  return () => {
    return (next) => (action) => {
      action.server = server;
      return next(action);
    };
  };
}
