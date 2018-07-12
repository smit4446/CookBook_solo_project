import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import cookbook from './cookbookReducer'

const store = combineReducers({
  user,
  login,
  cookbook
});

export default store;
