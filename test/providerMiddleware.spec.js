import chai, { expect } from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { Provider, providerMiddleware } from '../src/index';

chai.use(sinonChai);

describe('providerMiddleware', () => {
  it('should add providers to action', () => {
    class TestProvider extends Provider {
      name = '$test';
      $get() {
        return 'This is a test provider.';
      }
    }
    const action = { type: 'TEST' };
    const dispatch = spy();
    const getState = spy();
    const next = spy();
    providerMiddleware(TestProvider)({ dispatch, getState })(next)(action);
    expect(next).to.have.been.calledWith(action);
    expect(action).to.have.property('providers');
    expect(action.providers).to.have.property('$test');
    expect(action.providers.$test).to.be.equal('This is a test provider.');
  });

  it('should add providers to thunk action', (done) => {
    class TestProvider extends Provider {
      name = '$test';
      $get() {
        return 'This is a test provider.';
      }
    }
    const dispatch = spy();
    const getState = spy();
    const next = spy();
    const action = { type: 'TEST', thunk: (dispatch, getState, { $test })=>{
      expect($test).to.be.equal('This is a test provider.');
      done();
    } };
    providerMiddleware(TestProvider)({ dispatch, getState })(next)(action);
  });
});
