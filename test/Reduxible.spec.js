import { expect, spy } from 'cafeteria';
import React from 'react';
import combineReduxibleReducers from '../src/combineReduxibleReducers';
import Reduxible from '../src/Reduxible';
import httpMocks from 'node-mocks-http';

describe('Reduxible', () => {
  const mockContainer = () => <div></div>;
  const mockRoutes = [
    {
      path: '/',
      component: () => <div>Home</div>,
      childRoutes: [
        {
          path: 'redirect',
          onEnter: (nextState, replace) => {
            replace('/');
          }
        },
        {
          path: 'error',
          onEnter: () => {
            throw new Error('routeError');
          }
        }
      ]
    }
  ];
  const reducer = (state = {}) => state;
  const mockReducers = combineReduxibleReducers({ index: reducer });
  const mockOptions = {
    container: mockContainer,
    routes: mockRoutes,
    reducers: mockReducers
  };

  describe('constructor', () => {
    it('should throws error when container is empty', () => {
      expect(() => new Reduxible()).to.throw(Error);
    });

    it('should throws error when container is not react element factory', () => {
      expect(() => new Reduxible({ container: null })).to.throw(Error);
      expect(() => new Reduxible({ container: <div></div> })).to.throw(Error);
    });

    it('should throws error when errorContainer is not react element factory', () => {
      expect(() =>
        new Reduxible({
          container: () => <div></div>,
          errorContainer: <div></div>
        })).to.throw(Error);
    });

    it('should throws error when routes is empty', () => {
      expect(() => new Reduxible({
        container: mockContainer
      })).to.throw(Error);
    });

    it('should throws error when reducers is empty', () => {
      expect(() => new Reduxible({
        container: mockContainer,
        routes: mockRoutes
      })).to.throw(Error);
    });
  });

  describe('server', () => {
    const serverMockOptions = { ...mockOptions, config: { server: true } };
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    res.send = spy();
    res.redirect = spy();
    const mockNext = spy();

    it('should throws error when server is undefined or false', () => {
      const reduxible = new Reduxible(mockOptions);
      expect(() => reduxible.server()).to.throw(Error);

      reduxible.config.server = false;
      expect(() => reduxible.server()).to.throw(Error);
    });

    it('should returns express middleware function', () => {
      const reduxible = new Reduxible(serverMockOptions);
      expect(reduxible.server()).to.be.a('function');
    });

    it('should call res.send string when universal is false or undefined', async(done) => {
      try {
        const reduxible = new Reduxible(serverMockOptions);
        await reduxible.server()(req, res, mockNext);
        expect(res.send).to.have.been.called();
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should call next with error when there is no matching route path', async(done) => {
      try {
        const options = { ...serverMockOptions };
        options.config.universal = true;
        const reduxible = new Reduxible(options);
        req.url = '/none';
        await reduxible.server()(req, res, mockNext);
        expect(mockNext).to.have.been.called();
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should call next with error when error occurred while route', async(done) => {
      try {
        const options = { ...serverMockOptions };
        options.config.universal = true;
        const reduxible = new Reduxible(options);
        req.url = '/error';
        await reduxible.server()(req, res, mockNext);
        expect(mockNext).to.have.been.called();
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should call res.send with errorContainer when there is' +
      'no matching route path and there is errorContainer', async(done) => {
      try {
        const options = { ...serverMockOptions };
        options.config.universal = true;
        options.errorContainer = mockContainer;
        const reduxible = new Reduxible(options);
        req.url = '/none';
        await reduxible.server()(req, res, mockNext);
        expect(res.statusCode).to.be.equals(500);
        expect(res.send).to.have.been.called();
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should call res.redirect when matching route path will redirect', async(done) => {
      try {
        const options = { ...serverMockOptions };
        options.config.universal = true;
        const reduxible = new Reduxible(options);
        req.url = '/redirect';
        await reduxible.server()(req, res, mockNext);
        expect(res.redirect).to.have.been.calledWith('/');
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should call res.send when there is matching route path', async(done) => {
      try {
        const options = { ...serverMockOptions };
        options.config.universal = true;
        const reduxible = new Reduxible(options);
        req.url = '/';
        await reduxible.server()(req, res, mockNext);
        expect(res.send).to.have.been.called();
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should call res.send when there is matching route path' +
      'even initialAction will failed', async(done) => {
      try {
        const options = { ...serverMockOptions };
        options.config.universal = true;
        options.middlewares = [
          ({ dispatch, getState }) => next => action => {
            if (action.thunk) {
              return action.thunk(dispatch, getState);
            }
            return next(action);
          }
        ];
        options.initialActions = [{
          type: 'ERROR_ACTION',
          thunk: () => {
            throw new Error('Action Error');
          }
        }];
        const reduxible = new Reduxible(options);
        req.url = '/';
        await reduxible.server()(req, res, mockNext);
        expect(res.send).to.have.been.called();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('client', () => {
    require('jsdom-global')();

    it('should returns false if devTools is undefined', () => {
      const reduxible = new Reduxible(mockOptions);
      expect(reduxible.client).to.be.a('function');
    });

    it('should throws error when server is true', () => {
      const reduxible = new Reduxible(mockOptions);
      reduxible.config.server = true;
      expect(() => reduxible.client()).to.throw(Error);
    });

    it('should throws error when container is empty', () => {
      const reduxible = new Reduxible(mockOptions);
      expect(() => reduxible.client()).to.throw(Error);
    });

    it('should render client element to container', async (done) => {
      const reduxible = new Reduxible(mockOptions);
      const container = document.createElement('div');
      await reduxible.client({}, container);
      expect(container.innerHTML).to.not.be.empty();
      done();
    });

    it('should render client element with Devtools to container', async (done) => {
      const options = mockOptions;
      options.config = {
        server: false,
        development: true,
        devTools: <div>DevTools</div>
      };
      const reduxible = new Reduxible(options);
      const container = document.createElement('div');
      await reduxible.client({}, container);
      expect(container.innerHTML).to.not.be.empty();
      done();
    });
  });

  describe('production env', () => {
    require('jsdom-global')();

    before(() => {
      delete process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      delete require.cache[require.resolve('../src/ReduxibleRouterImpl')];
      delete require.cache[require.resolve('../src/StoreFactoryImpl')];
      require('../src/ReduxibleRouterImpl');
      require('../src/StoreFactoryImpl');
    });

    it('should call base (StoreFactory|ReduxibleRouter) Impl.', async(done) => {
      const reduxible = new Reduxible(mockOptions);
      const container = document.createElement('div');
      await reduxible.client({}, container);
      expect(container.innerHTML).to.not.be.empty();
      done();
    });
  });
});
