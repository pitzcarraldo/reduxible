export default class ReduxibleConfig {
  constructor(options = {}) {
    this.server = options.server || false;
    this.development = options.development || false;
    this.universal = options.universal || false;
    this.hashHistory = options.hashHistory || false;
    this.devTools = options.devTools || false;
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
