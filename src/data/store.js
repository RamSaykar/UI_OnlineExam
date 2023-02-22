import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { UserReducer} from './reducers/index';

const rootReducer = combineReducers({
    UserReducer: UserReducer,
  })

const initialState = {};
const middleware = [thunk];
const store = createStore(rootReducer, initialState, compose(
  applyMiddleware(...middleware, promiseMiddleware),))

export default store;
