import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as context } from './contextService';

export default function combineReduxibleReducers(reducers) {
  return combineReducers({ ...reducers, context, routing });
}
