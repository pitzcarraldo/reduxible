import { expect } from 'chai';
import { createAction, createReducer } from '../src/utils';

describe('utils', () => {
  describe('createAction', () => {
    it('should return action by type when action is function', () => {
      const action = createAction(
        {
          INCREMENT: count => () => ({ payload: count + 1 })
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

    it('should return action with namespace when namespace is exists', () => {
      const action = createAction('CALCULATE',
        {
          GET_NUMBER: {
            payload: 1
          }
        }
      );
      expect(action('GET_NUMBER')()).to.have.property('type', 'CALCULATE/GET_NUMBER');
    });

    it('should return action type with namespace when namespace is exists', () => {
      const action = createAction('CALCULATE',
        {
          GET_NUMBER: {
            payload: 1
          }
        }
      );
      expect(action.type('GET_NUMBER')).to.be.equal('CALCULATE/GET_NUMBER');
    });
  });

  describe('createReducer', () => {
    it('should return reducer without error when types are null', () => {
      const initialState = { info: null };
      const reducer = createReducer(initialState, [
        {
          reduce: ({ payload: { info } }, prevState) => ({
            ...prevState,
            info
          })
        }
      ]);
      const actual = reducer(initialState, { payload: { info: 'new info' } });
      expect(actual.info).to.be.equal(null);
    });

    it('should return reducers dictionary' +
      'and can reduce multiple actions by multiple reducers', () => {
      const initialState = { info: null };
      const reducer = createReducer(initialState, [
        {
          types: ['UPDATE_INFO', 'REMOVE_INFO'],
          reduce: ({ payload: { info } }, state) => ({
            ...state,
            info
          })
        },
        {
          types: ['UPDATE_INFO', 'REMOVE_INFO'],
          reduce: ({ payload: { modified } }, state) => ({
            ...state,
            lastModified: modified
          })
        }
      ]);
      let time = new Date().getTime();
      let state = reducer(initialState, {
        type: 'UPDATE_INFO',
        payload: { info: 'new info', modified: time }
      });
      expect(state).to.have.property('info', 'new info');
      expect(state).to.have.property('lastModified', time);
      time = new Date().getTime();
      state = reducer(state, {
        type: 'REMOVE_INFO',
        payload: { info: null, modified: new Date().getTime() }
      });
      expect(state).to.have.property('info', null);
      expect(state).to.have.property('lastModified', time);
    });
  });
});
