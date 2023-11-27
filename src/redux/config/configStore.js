import { createStore } from 'redux';
import { combineReducers } from 'redux';
import filterConfig from 'redux/modules/filterConfig';
import feeds from 'redux/modules/feeds';
import modal from 'redux/modules/modal';
import currentEmail from 'redux/modules/currentEmail';
import publicModal from 'redux/modules/publicModal';

const rootReducer = combineReducers({
  filterConfig,
  feeds,
  modal,
  currentEmail,
  publicModal
});

const store = createStore(rootReducer);

export default store;
