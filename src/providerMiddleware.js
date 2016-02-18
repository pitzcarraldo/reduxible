export default function providerMiddleware(...willProvide) {
  return ({ dispatch, getState }) => {
    return next => action => {
      const providers = willProvide.reduce((prevProviders, Provider) => {
        const provider = new Provider();
        prevProviders[provider.name] = provider.$get(action.context || {});
        return prevProviders;
      }, {});

      if (action.thunk) {
        return action.thunk(dispatch, getState, providers);
      }

      action.providers = providers;
      return next(action);
    };
  };
}
