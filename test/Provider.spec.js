import { expect } from 'chai';
import { Provider } from '../src/index';

describe('Provider', () => {
  it('should throws error when $get is not implemented', () => {
    class TestProvider extends Provider {}
    expect(() => new TestProvider()).to.throw(Error);
  });
});
