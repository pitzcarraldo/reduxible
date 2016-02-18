export default class Provider {
  constructor() {
    if (!this.$get) {
      throw new Error('Not implemented: $get()');
    }
  }
}
