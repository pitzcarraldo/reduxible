import { expect } from 'chai';
import { createAction, createReducer } from '../src/utils';

describe('utils', () => {

  describe('createAction', () => {
    it('should return action by type when action is function', () => {
      const action = createAction(
        {
          INCREMENT: count => {
            return () => ({ payload: count + 1 });
          }
        }
      );
      expect(action('INCREMENT')(1)()).to.have.property('payload', 2);
    });

    it('should return actionCreator by type when actionCreator is function', () => {
      const action = createAction(
        {
          INCREMENT: count => ({ payload: count + 1 })
        }
      );
      expect(action('INCREMENT')(1)).to.have.property('payload', 2);
    });

    it('should return actionCreator by type when actionCreator is just value', () => {
      const action = createAction(
        {
          GET_NUMBER: 1
        }
      );
      expect(action('GET_NUMBER')()).to.have.property('payload', 1);
    });

    it('should return actionCreator by type when actionCreator is just object', () => {
      const action = createAction(
        {
          GET_NUMBER: {
            payload: 1
          }
        }
      );
      expect(action('GET_NUMBER')()).to.have.property('payload', 1);
    });

    it('should return action only have type when there is no matched action', () => {
      const action = createAction(
        {
          GET_NUMBER: {
            payload: 1
          }
        }
      );
      expect(action('SET_NUMBER')()).to.have.property('type', 'SET_NUMBER');
    });

  });

  describe('createReducer', () => {
    it('should return reducer without error when types are null', () => {
      let state = { info: null };
      const reducer = createReducer(state, [
        {
          reduce: ({ payload: { info } }, state) => {
            return {
              ...state,
              info
            };
          }
        }
      ]);
      state = reducer(state, { payload: { info: 'new info' } });
      expect(state).to.be.equal(state);
    });

    it('should return reducers dictionary and can reduce multiple actions by multiple reducers', () => {
      let state = { info: null };
      const reducer = createReducer(state, [
        {
          types: [ 'UPDATE_INFO', 'REMOVE_INFO' ],
          reduce: ({ payload: { info } }, state) => {
            return {
              ...state,
              info
            };
          }
        },
        {
          types: [ 'UPDATE_INFO', 'REMOVE_INFO' ],
          reduce: ({ payload : { modified } }, state) => {
            return {
              ...state,
              lastModified: modified
            };
          }
        }
      ]);
      let time = new Date().getTime();
      state = reducer(state, { type: 'UPDATE_INFO', payload: { info: 'new info', modified: time } });
      expect(state).to.have.property('info', 'new info');
      expect(state).to.have.property('lastModified', time);
      time = new Date().getTime();
      state = reducer(state, { type: 'REMOVE_INFO', payload: { info: null, modified: new Date().getTime() } });
      expect(state).to.have.property('info', null);
      expect(state).to.have.property('lastModified', time);
    });
  });

});
