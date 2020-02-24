import { createStore, applyMiddleware } from 'redux';
import api from '../middlewares/api';
import reducer from '../reducers';

const enhancer = applyMiddleware(api);

const store = createStore(reducer, {}, enhancer);

export default store;

// dev only
window.store = store;
