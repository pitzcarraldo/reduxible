export default class ReduxibleConfig {
  constructor(options = {}) {
    this.server = !!options.server;
    this.development = !!options.development;
    this.universal = !!options.universal;
    this.hashHistory = !!options.hashHistory;
    this.devTools = !!options.devTools;
  }

  isServer() {
    return this.server;
  }

  isClient() {
    return !this.server;
  }

  isDevelopment() {
    return this.development;
  }

  isProduction() {
    return !this.development;
  }

  isUniversal() {
    return this.universal;
  }

  useDevTools() {
    return this.isClient() && this.isDevelopment() && this.devTools;
  }

  useHashHistory() {
    return this.isClient() && !this.isUniversal() && this.hashHistory;
  }
}
