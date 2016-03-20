export default function contextMiddleware(context) {
  return () =>
    next =>
      action =>
        next({ ...action, context });
}
