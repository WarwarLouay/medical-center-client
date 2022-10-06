import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootReducer } from './Reducer/index';

export const store = createStore(RootReducer, composeWithDevTools());